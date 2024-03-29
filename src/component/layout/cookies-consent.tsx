import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppState } from '../state/app-state-provider';
import { useResourceState } from '../state/resource-state-provider';

const CookiesConsent = () => {
    const appState = useAppState();
    const resourceState = useResourceState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (appState === undefined) {
            setShow(false);
        } else if (appState.cookiesEnabled === undefined || appState.cookiesEnabled) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [appState]);

    return (!show ? null :
        <div className="alert alert-warning text-xs md:text-base">
            <span>
                <span>{resourceState?.common?.cookiesConsent.text}</span>
                <span> </span>
                <NavLink
                    className="link"
                    to="/ui/cookies-info"
                >{resourceState?.common?.cookiesConsent.link}</NavLink>
            </span>
            <div>
                <button
                    className="btn btn-sm normal-case text-xs md:text-base"
                    onClick={() => {
                        appState?.enableCookies();
                    }}
                >{resourceState?.common?.cookiesConsent.action}</button>
            </div>
        </div>)
}

export default CookiesConsent;
