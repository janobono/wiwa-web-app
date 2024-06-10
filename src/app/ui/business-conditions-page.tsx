import MdPage from './md-page';
import { getBusinessConditions } from '../../api/controller/ui';

const BusinessConditionsPage = () => {
    return (
        <MdPage getData={getBusinessConditions}/>
    )
}

export default BusinessConditionsPage;
