import { getGdprInfo } from '../../api/controller/ui';
import MdPage from '../../component/app/ui/md-page';

const GdprInfoPage = () => {
    return (
        <MdPage getData={getGdprInfo}/>
    )
}

export default GdprInfoPage;
