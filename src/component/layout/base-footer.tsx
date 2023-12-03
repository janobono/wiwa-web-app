import type { ReactNode } from 'react';
import { ExternalLink } from 'react-feather';
import { NavLink } from 'react-router-dom';

import { useUiState } from '../state/ui-state-provider';
import { PATH_LOGO } from '../../data';

const BaseFooter = ({children}: { children?: ReactNode }) => {
    const uiState = useUiState();

    return (
        <>
            <footer className="footer p-10 bg-base-300 text-base-content">
                <aside className="flex-col justify-center items-center">
                    <NavLink
                        title={uiState?.title}
                        to="/"
                    >
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={PATH_LOGO}
                            alt="Logo"
                        />
                    </NavLink>
                    <p>{uiState?.title}</p>
                </aside>
                {children}
            </footer>
            <div className="py-5 text-sm bg-base-100 text-base-content">
                <div className="container px-5 m-auto">
                    <div className="flex gap-1 justify-center">
                        <span>© 2023 Copyright:</span>
                        <a
                            className="link"
                            href="https://www.janobono.com"
                        >
                            <div className="flex items-center"><span>janobono</span><ExternalLink size="18"/></div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseFooter;
