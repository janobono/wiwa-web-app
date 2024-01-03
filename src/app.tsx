import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppPage from './app/app-page';
import ConfirmAccount from './component/layout/confirm-account';
import CookiesConsent from './component/layout/cookies-consent';
import DisabledAccount from './component/layout/disabled-account';
import RefreshToken from './component/layout/refresh-token';
import { useHealthState } from './component/state/health-state-provider';
import { useUiState } from './component/state/ui-state-provider';
import WiwaSpinner from './component/ui/wiwa-spinner';

function App() {
    const healthState = useHealthState();
    const uiState = useUiState();

    useEffect(() => {
        document.title = uiState?.applicationProperties?.appTitle || '';
        const el = document.querySelector('meta[name=\'description\']');
        el?.setAttribute('content', uiState?.applicationProperties?.appDescription || '');
    }, [uiState?.applicationProperties]);

    return (
        healthState?.up ?
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
