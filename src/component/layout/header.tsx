import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RESOURCE } from '../../locale';
import { useUiState } from '../../state';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const uiState = useUiState();

    return (
        <header className="w-full">
            <div className="py-5 bg-blue-200">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                        <img
                            title={t(RESOURCE.ACTION.HOME).toString()}
                            onClick={() => navigate('/')}
                            className="flex-none w-[100px] h-[100px] object-scale-down object-center hover:cursor-pointer"
                            src={uiState.logoUrl ? uiState.logoUrl : '/logo192.png'}
                            alt="Logo"
                        />
                        <div className="flex-grow font-bold text-xl md:text-3xl text-center">
                            {uiState.title ? uiState.title : t(RESOURCE.TITLE)}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
