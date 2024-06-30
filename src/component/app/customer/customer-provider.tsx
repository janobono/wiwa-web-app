import {
    Order,
    OrderCommentChange,
    OrderField,
    OrderItem,
    OrderItemChange,
    OrderSearchCriteria,
    OrderStatus,
    SendOrder
} from '../../../api/model/order';
import { WiwaError } from '../../../api/model';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext, ErrorContext } from '../../../context';
import { ClientResponse } from '../../../api/controller';
import * as orderApi from '../../../api/controller/order';

export interface CustomerState {
    busy: boolean,
    editEnabled: boolean,
    submitEnabled: boolean,
    orderFinal: boolean,
    previous: boolean,
    next: boolean,
    page: number,
    setPage: (page: number) => void,
    setCriteria: (criteria?: OrderSearchCriteria) => void,
    data?: Order[],
    selected?: Order,
    setSelected: (order?: Order) => void,
    getOrders: () => Promise<boolean>,
    addOrder: () => Promise<boolean>,
    sendOrder: (sendOrder: SendOrder) => Promise<WiwaError | undefined>,
    deleteOrder: () => Promise<void>,
    getHtml: () => Promise<string>,
    addComment: (orderCommentChange: OrderCommentChange) => Promise<void>,
    selectedItem?: OrderItem,
    setSelectedItem: (orderItem?: OrderItem) => void,
    editItemMode: boolean,
    setEditItemMode: (editItemMode: boolean) => void,
    addItem: (orderItemChange: OrderItemChange) => Promise<WiwaError | undefined>,
    setItem: (orderItemChange: OrderItemChange) => Promise<WiwaError | undefined>,
    moveUpItem: () => Promise<void>,
    moveDownItem: () => Promise<void>,
    deleteItem: () => Promise<void>
}

export const CustomerContext = createContext<CustomerState | undefined>(undefined);

const CustomerProvider = ({children}: { children: ReactNode }) => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);

    const [busy, setBusy] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [orderFinal, setOrderFinal] = useState(false);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);
    const [page, setPage] = useState(0);
    const [criteria, setCriteria] = useState<OrderSearchCriteria>();
    const [data, setData] = useState<Order[]>();
    const [selected, setSelected] = useState<Order>();
    const [selectedItem, setSelectedItem] = useState<OrderItem>();
    const [editItemMode, setEditItemMode] = useState(false);

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(data[index].status === OrderStatus.NEW);
                setSubmitEnabled(data[index].status === OrderStatus.NEW && data[index].items.length > 0);
                setOrderFinal(data[index].status === OrderStatus.CANCELLED || data[index].status === OrderStatus.FINISHED);
                if (selectedItem) {
                    const itemIndex = data[index].items.findIndex(item => item.id === selectedItem?.id);
                    if (itemIndex !== -1) {
                        setSelectedItem(data[index].items[itemIndex]);
                    }
                }
            }
        } else {
            setSelected(undefined);
            setSelectedItem(undefined);
        }
    }, [data, selected, selectedItem]);

    useEffect(() => {
        getOrders().then();
    }, [criteria, page]);

    const createData = (): Order[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const createCriteria = () => {
        const newCriteria: OrderSearchCriteria = {...criteria};
        newCriteria.userIds = [authState?.authUser?.user.id || -1];
        return newCriteria;
    }

    const handleResponse = (response: ClientResponse<Order>) => {
        if (response.data) {
            const newData = createData();
            const index = newData.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                newData[index] = response.data;
            }
            setData(newData);
        }
    }

    const getOrders = async () => {
        setBusy(true);
        try {
            const response = await orderApi.getOrders(createCriteria(), {
                page,
                size: 10,
                sort: {field: OrderField.orderNumber, asc: false}
            }, authState?.authToken?.accessToken);
            setPrevious(!response.data?.first || false);
            setNext(!response.data?.last || false);
            setData(response.data?.content);
            errorState?.addError(response.error);
            return response.error === undefined;
        } finally {
            setBusy(false);
        }
    }

    const addOrder = async () => {
        setBusy(true);
        try {
            const response = await orderApi.addOrder(authState?.authToken?.accessToken);
            if (response.data) {
                const newData = [response.data, ...createData()];
                setData(newData);
                setSelected(response.data);
            }
            errorState?.addError(response.error);
            return response.error === undefined;
        } finally {
            setBusy(false);
        }
    }

    const sendOrder = async (sendOrder: SendOrder) => {
        setBusy(true);
        try {
            const response = await orderApi.sendOrder(selected?.id || -1, sendOrder, authState?.authToken?.accessToken);
            handleResponse(response);
            return response.error;
        } finally {
            setBusy(false);
        }
    }

    const deleteOrder = async () => {
        setBusy(true);
        try {
            const response = await orderApi.deleteOrder(selected?.id || -1, authState?.authToken?.accessToken);
            if (!response.error) {
                const newData = createData();
                const index = newData.findIndex(item => item.id === selected?.id);
                if (index !== -1) {
                    newData.splice(index, 1);
                }
                setData(newData);
                setSelected(undefined);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const getHtml = async () => {
        setBusy(true);
        try {
            const response = await orderApi.getHtml(selected?.id || -1, authState?.authToken?.accessToken);
            errorState?.addError(response.error);
            return response.data?.value || '';
        } finally {
            setBusy(false);
        }
    }

    const addComment = async (orderCommentChange: OrderCommentChange) => {
        setBusy(true);
        try {
            const response = await orderApi.addComment(selected?.id || -1, orderCommentChange, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const addItem = async (orderItemChange: OrderItemChange) => {
        setBusy(true);
        try {
            const response = await orderApi.addItem(selected?.id || -1, orderItemChange, authState?.authToken?.accessToken);
            handleResponse(response);
            return response.error;
        } finally {
            setBusy(false);
        }
    }

    const setItem = async (orderItemChange: OrderItemChange) => {
        setBusy(true);
        try {
            const response = await orderApi.setItem(selected?.id || -1, selectedItem?.id || -1, orderItemChange, authState?.authToken?.accessToken);
            handleResponse(response);
            return response.error;
        } finally {
            setBusy(false);
        }
    }

    const moveUpItem = async () => {
        setBusy(true);
        try {
            const response = await orderApi.moveUpItem(selected?.id || -1, selectedItem?.id || -1, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const moveDownItem = async () => {
        setBusy(true);
        try {
            const response = await orderApi.moveDownItem(selected?.id || -1, selectedItem?.id || -1, authState?.authToken?.accessToken);
            handleResponse(response);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const deleteItem = async () => {
        setBusy(true);
        try {
            const response = await orderApi.deleteItem(selected?.id || -1, selectedItem?.id || -1, authState?.authToken?.accessToken);
            if (!response.error) {
                setSelectedItem(undefined);
            }
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <CustomerContext.Provider
            value={
                {
                    busy,
                    editEnabled,
                    submitEnabled,
                    orderFinal,
                    previous,
                    next,
                    page,
                    setPage,
                    setCriteria: (criteria?: OrderSearchCriteria) => {
                        const newCriteria = {...criteria};
                        newCriteria.userIds = [authState?.authUser?.user.id || -1];
                        setCriteria(newCriteria);
                    },
                    data,
                    selected,
                    setSelected,
                    getOrders,
                    addOrder,
                    sendOrder,
                    deleteOrder,
                    getHtml,
                    addComment,
                    selectedItem,
                    setSelectedItem,
                    editItemMode,
                    setEditItemMode,
                    addItem,
                    setItem,
                    moveUpItem,
                    moveDownItem,
                    deleteItem
                }
            }
        >{children}
        </CustomerContext.Provider>
    );
}

export default CustomerProvider;
