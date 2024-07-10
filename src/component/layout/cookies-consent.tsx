import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AppContext, CommonResourceContext } from '../../context';

const CookiesConsent = () => {
    const appState = useContext(AppContext);
    const commonResourceState = useContext(CommonResourceContext);

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
                <span>{commonResourceState?.resource?.cookiesConsent.text}</span>
                <NavLink
                    className="link"
                    to="/ui/cookies-info"
                >{commonResourceState?.resource?.cookiesConsent.link}</NavLink>
                <button
                    className="btn btn-sm normal-case text-xs md:text-base"
                    onClick={() => {
                        appState?.enableCookies();
                    }}
                >{commonResourceState?.resource?.cookiesConsent.action}</button>
            </div>
    )
}

export default CookiesConsent;
