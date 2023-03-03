import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../../locale';

import { WiwaTabs } from '../../ui';

const ConfigInfoPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        if (location.pathname === '/config') {
            navigate('/config/ui');
        }
    }, [location]);

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.ACTION.CONFIG)}
                    </div>
                </div>
                <WiwaTabs
                    tabs={[
                        {
                            key: '1',
                            tabName: t(RESOURCE.COMPONENT.PAGE.CONFIG.UI.TITLE).toString(),
                            tabSelected: location.pathname === '/config/ui',
                            onSelect: () => navigate('/config/ui')
                        },
                        {
                            key: '2',
                            tabName: t(RESOURCE.COMPONENT.PAGE.CONFIG.APPLICATION_IMAGES.TITLE).toString(),
                            tabSelected: location.pathname === '/config/application-images',
                            onSelect: () => navigate('/config/application-images')
                        }
                    ]}
                />
                <Outlet/>
            </div>
        </section>
    );
}

export default ConfigInfoPage;
