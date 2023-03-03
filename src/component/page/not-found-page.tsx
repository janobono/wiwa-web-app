import React from 'react';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../locale';

const NotFoundPage: React.FC = () => {
    const {t} = useTranslation();

    return (
        <section className="w-full">
            <div className="flex min-h-[250px] justify-center items-center">
                <div className="font-mono text-xl">{t(RESOURCE.PAGE_NOT_FOUND)}</div>
            </div>
        </section>
    );
};

export default NotFoundPage;
