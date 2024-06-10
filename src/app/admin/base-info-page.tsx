import LogoEditor from '../../component/app/admin/logo-editor';
import TitleEditor from '../../component/app/admin/title-editor';
import WelcomeTextEditor from '../../component/app/admin/welcome-text-editor';
import ApplicationInfoEditor from '../../component/app/admin/application-info-editor';

const BaseInfoPage = () => {
    return (
        <div className="flex flex-col p-5 gap-5 w-full">
            <LogoEditor/>
            <TitleEditor/>
            <WelcomeTextEditor/>
            <ApplicationInfoEditor/>
        </div>
    )
}

export default BaseInfoPage;



