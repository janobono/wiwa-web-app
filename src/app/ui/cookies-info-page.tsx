import { getCookiesInfo } from '../../api/controller/ui';
import MdPage from '../../component/app/ui/md-page';

const CookiesInfoPage = () => {
    return (
        <MdPage getData={getCookiesInfo}/>
    )
}

export default CookiesInfoPage;
