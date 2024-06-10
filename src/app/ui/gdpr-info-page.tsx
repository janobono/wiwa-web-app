import MdPage from './md-page';
import { getGdprInfo } from '../../api/controller/ui';

const GdprInfoPage = () => {
    return (
        <MdPage getData={getGdprInfo}/>
    )
}

export default GdprInfoPage;
