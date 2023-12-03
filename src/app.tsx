import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppPage from './app/app-page';
import ConfirmAccount from './component/layout/confirm-account';
import CookiesConsent from './component/layout/cookies-consent';
import DisabledAccount from './component/layout/disabled-account';
import RefreshToken from './component/layout/refresh-token';
import { useConfigState } from './component/state/config-state-provider';
import WiwaSpinner from './component/ui/wiwa-spinner';

function App() {
    const configState = useConfigState();

    useEffect(() => {
        document.title = configState?.appTitle || '';
    }, [configState?.appTitle]);

    useEffect(() => {
        const el = document.querySelector('meta[name=\'description\']');
        el?.setAttribute('content', configState?.appDescription || '');
    }, [configState?.appDescription]);

    return (
        configState?.up ?
            <BrowserRouter>
                <ConfirmAccount/>
                <CookiesConsent/>
                <DisabledAccount/>
                <RefreshToken/>
                <AppPage/>
            </BrowserRouter>
            :
            <div className="flex gap-5 w-full h-screen items-center justify-center">
                <WiwaSpinner/>
            </div>
    )
}

export default App
