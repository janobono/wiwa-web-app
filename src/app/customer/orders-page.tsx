import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { useResourceState } from '../../state/resource';

const OrdersPage = () => {
    const resourceState = useResourceState();

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                }
            ]}/>
        </>
    )
}

export default OrdersPage;
