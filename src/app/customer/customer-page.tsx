import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import * as orderApi from '../../api/controller/order';
import { Authority } from '../../api/model';
import { Order, OrderCommentChange, OrderField, OrderSearchCriteria, OrderStatus } from '../../api/model/order';
import AuthDefender from '../../component/layout/auth-defender';
import BaseFooter from '../../component/layout/base-footer';
import MaintenanceDefender from '../../component/layout/maintenance-defender';
import Navigation from '../../component/layout/navigation';
import { AuthContext, ErrorContext } from '../../context';

const CustomerPage = () => {
    return (
        <MaintenanceDefender>
            <AuthDefender authority={Authority.W_CUSTOMER}>
                <Navigation/>
                <main className="w-full bg-base text-base-content">
                    <CustomerProvider>
                        <Outlet/>
                    </CustomerProvider>
                </main>
                <BaseFooter/>
            </AuthDefender>
        </MaintenanceDefender>
    )
}

export default CustomerPage;

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
    deleteOrder: () => Promise<boolean>,
    getHtml: () => Promise<string>,
    addComment: (orderCommentChange: OrderCommentChange) => Promise<void>;
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

    useEffect(() => {
        setEditEnabled(false);

        if (selected && data) {
            const index = data.findIndex(item => item.id === selected?.id);
            if (index !== -1) {
                setSelected(data[index]);
                setEditEnabled(data[index].status === OrderStatus.NEW);
                setSubmitEnabled(data[index].status === OrderStatus.NEW && data[index].items.length > 0);
                setOrderFinal(data[index].status === OrderStatus.CANCELLED || data[index].status === OrderStatus.FINISHED);
            }
        } else {
            setSelected(undefined);
        }
    }, [data, selected]);

    useEffect(() => {
        getOrders().then();
    }, [criteria, page]);

    const createData = (): Order[] => {
        if (data) {
            return [...data];
        }
        return [];
    }

    const getOrders = async () => {
        setBusy(true);
        try {
            const response = await orderApi.getOrders(criteria, {
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
            if (data && response.data) {
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
            return response.error === undefined;
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
            if (response.data) {
                const newData = createData();
                const index = newData.findIndex(item => item.id === response.data?.id);
                if (index !== -1) {
                    newData[index] = response.data;
                }
                setData(newData);
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
                    deleteOrder,
                    getHtml,
                    addComment
                }
            }
        >{children}
        </CustomerContext.Provider>
    );
}
