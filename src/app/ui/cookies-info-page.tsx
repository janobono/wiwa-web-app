import MdPage from './md-page';
import { getCookiesInfo } from '../../api/controller/ui';

const CookiesInfoPage = () => {
    return (
        <MdPage getData={getCookiesInfo}/>
    )
}

export default CookiesInfoPage;
