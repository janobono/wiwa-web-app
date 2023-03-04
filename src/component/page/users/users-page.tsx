import React from 'react';
import { useTranslation } from 'react-i18next';
import { RESOURCE } from '../../../locale';
import { WiwaTabs } from '../../ui';
import { Outlet } from 'react-router-dom';

const UsersPage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <section className="w-full">
            <div className="container p-5 mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-lg md:text-xl font-bold text-center mb-5">
                        {t(RESOURCE.COMPONENT.PAGE.USERS.USERS.TITLE)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UsersPage;
