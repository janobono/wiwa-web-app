import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomerContext } from '../../component/app/customer/customer-provider';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { ResourceContext } from '../../context';
import { Part } from '../../api/model/order/part';

const OrderItemEditPage = () => {
    const navigate = useNavigate();

    const resourceState = useContext(ResourceContext);
    const customerState = useContext(CustomerContext);

    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    const [description, setDescription] = useState('');

    const [orientation, setOrientation] = useState(false);

    const [quantity, setQuantity] = useState<number>();
    const [quantityValid, setQuantityValid] = useState(false);

    const [part, setPart] = useState<Part>();
    const [partValid, setPartValid] = useState(false);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {
                    key: 0,
                    label: resourceState?.common?.navigation.customerNav.title || '',
                    to: '/customer'
                },
                {
                    key: 1,
                    label: resourceState?.common?.navigation.customerNav.orderEdit || '',
                    to: '/customer/order-edit'
                },
                {
                    key: 2,
                    label: resourceState?.common?.navigation.customerNav.orderItemEdit || '',
                    to: '/customer/order-item-edit'
                }
            ]}/>
            <div className="flex flex-col p-5 gap-5 w-full">

            </div>
        </>
    )
}

export default OrderItemEditPage;
