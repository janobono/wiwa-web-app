import { getBusinessConditions } from '../../api/controller/ui';
import MdPage from '../../component/app/ui/md-page';

const BusinessConditionsPage = () => {
    return (
        <MdPage getData={getBusinessConditions}/>
    )
}

export default BusinessConditionsPage;
