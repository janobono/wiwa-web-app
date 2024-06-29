import { getOrderInfo } from '../../api/controller/ui';
import MdPage from '../../component/app/ui/md-page';

const OrderInfoPage = () => {
    return (
        <MdPage getData={getOrderInfo}/>
    )
}

export default OrderInfoPage;
