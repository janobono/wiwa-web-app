import { useContext } from 'react';

import LogoEditor from '../../component/app/admin/base-info/logo-editor';
import TitleEditor from '../../component/app/admin/base-info/title-editor';
import WelcomeTextEditor from '../../component/app/admin/base-info/welcome-text-editor';
import ApplicationInfoEditor from '../../component/app/admin/base-info/application-info-editor';
import WiwaBreadcrumb from '../../component/ui/wiwa-breadcrumb';
import { ResourceContext } from '../../context';

const BaseInfoPage = () => {
    const resourceState = useContext(ResourceContext);

    return (
        <>
            <WiwaBreadcrumb breadcrumbs={[
                {key: 0, label: resourceState?.common?.navigation.adminNav.title || ''},
                {
                    key: 1,
                    label: resourceState?.common?.navigation.adminNav.baseInfo || '',
                    to: '/admin/base-info'
                }
            ]}/>
            <div className="flex flex-col gap-5 p-5 w-full">
                <LogoEditor/>
                <TitleEditor/>
                <WelcomeTextEditor/>
                <ApplicationInfoEditor/>
            </div>
        </>
    )
}

export default BaseInfoPage;
