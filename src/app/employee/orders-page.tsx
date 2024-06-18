import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { useResourceState } from '../../state/resource';

const OrdersPage = () => {
    const resourceState = useResourceState();

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.employeeNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.employeeNav.orders || '',
                    to: '/employee'
                }
            ]}/>
        </>
    )
}

export default OrdersPage;
