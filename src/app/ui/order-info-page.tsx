import MdPage from './md-page';
import { getOrderInfo } from '../../api/controller/ui';

const OrderInfoPage = () => {
    return (
        <MdPage getData={getOrderInfo}/>
    )
}

export default OrderInfoPage;
