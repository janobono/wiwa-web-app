import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getApplicationProperties } from './api/controller/ui';
import AppPage from './app/app-page';
import ConfirmAccount from './component/layout/confirm-account';
import CookiesConsent from './component/layout/cookies-consent';
import DisabledAccount from './component/layout/disabled-account';
import MaintenanceInfo from './component/layout/maintenance-info';
import RefreshToken from './component/layout/refresh-token';
import WiwaSpinner from './component/ui/wiwa-spinner';
import { useHealthState } from './state/health';

function App() {
    const healthState = useHealthState();

    useEffect(() => {
        getApplicationProperties().then(data => {
            document.title = data.data?.appTitle || '';
            const el = document.querySelector('meta[name=\'description\']');
            el?.setAttribute('content', data.data?.appDescription || '');
        });
    }, []);

    return (
        healthState?.up ?
            <BrowserRouter>
                <ConfirmAccount/>
                <CookiesConsent/>
                <DisabledAccount/>
                <MaintenanceInfo/>
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
