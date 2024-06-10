import { ReactNode, useEffect, useState } from 'react';
import { ExternalLink } from 'react-feather';
import { NavLink } from 'react-router-dom';

import { getLogoPath, getTitle } from '../../api/controller/ui';

const BaseFooter = ({children}: { children?: ReactNode }) => {

    const [title, setTitle] = useState<string>();

    useEffect(() => {
        getTitle().then(data => setTitle(data.data?.value));
    }, []);

    return (
        <>
            <footer className="footer p-10 bg-base-300 text-base-content">
                <aside className="flex-col justify-center items-center">
                    <NavLink
                        title={title}
                        to="/"
                    >
                        <img
                            className="flex-none w-24 h-24 object-scale-down object-center"
                            src={getLogoPath()}
                            alt="Logo"
                        />
                    </NavLink>
                    <p>{title}</p>
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
