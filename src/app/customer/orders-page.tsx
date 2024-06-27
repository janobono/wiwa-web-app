import { useContext, useEffect, useState } from 'react';

import { CustomerContext } from './customer-page';
import { getOrders } from '../../api/controller/order';
import { Order, OrderField, OrderSearchCriteria } from '../../api/model/order';
import CustomerOrderSearchCriteriaForm from '../../component/order/customer-order-search-criteria-form';
import OrderTable from '../../component/order/order-table';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import WiwaPageable from '../../component/ui/wiwa-pageable';
import { AuthContext, ErrorContext, ResourceContext } from '../../context';

const OrdersPage = () => {
    const authState = useContext(AuthContext);
    const errorState = useContext(ErrorContext);
    const resourceState = useContext(ResourceContext);

    const customerState = useContext(CustomerContext);

    const [busy, setBusy] = useState(false);
    const [criteria, setCriteria] = useState<OrderSearchCriteria>();
    const [page, setPage] = useState(0);
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(() => {
        fetchData().then();
    }, [criteria]);

    useEffect(() => {
        setPrevious(customerState?.data !== undefined && !customerState.data.first);
        setNext(customerState?.data !== undefined && !customerState.data.last);

        const data = customerState?.data;
        const selected = customerState?.selected;
        if (data && selected) {
            const index = data.content.findIndex(item => item.id === selected.id);
            if (index !== -1) {
                customerState?.setSelected(data.content[index]);
            }
        } else {
            customerState?.setSelected(undefined);
        }
    }, [customerState, customerState?.data, customerState?.selected]);

    const fetchData = async () => {
        setBusy(true);
        try {
            const response = await getOrders(criteria, {page, size: 10}, authState?.authToken?.accessToken);
            customerState?.setData(response.data);
            errorState?.addError(response.error);
        } finally {
            setBusy(false);
        }
    }

    const setSelected = (order?: Order) => {
        customerState?.setSelected(order)
    }

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <CustomerOrderSearchCriteriaForm
                    searchHandler={(criteria) => {
                    }}
                />

                <div className="overflow-x-auto">
                    <OrderTable
                        fields={[
                            OrderField.orderNumber,
                            OrderField.created,
                            OrderField.status,
                            OrderField.total,
                            OrderField.vatTotal
                        ]}
                        rows={customerState?.data?.content}
                        selected={customerState?.selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <WiwaPageable
                        isPrevious={previous}
                        previousHandler={() => setPage(page + 1)}
                        page={page + 1}
                        pageHandler={() => fetchData()}
                        isNext={next}
                        nextHandler={() => setPage(page - 1)}
                        disabled={busy}
                    />
                </div>
            </div>
        </>
    )
}

export default OrdersPage;
