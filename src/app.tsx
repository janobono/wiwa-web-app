import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { HealthContext } from './context';
import { getApplicationProperties } from './api/controller/ui';
import AppPage from './app/app-page';
import ConfirmAccount from './component/layout/confirm-account';
import CookiesConsent from './component/layout/cookies-consent';
import DisabledAccount from './component/layout/disabled-account';
import ErrorInfo from './component/layout/error-info';
import MaintenanceInfo from './component/layout/maintenance-info';
import RefreshToken from './component/layout/refresh-token';
import WiwaSpinner from './component/ui/wiwa-spinner';

function App() {
    const healthState = useContext(HealthContext);

    useEffect(() => {
        getApplicationProperties().then(data => {
            document.title = data.data?.appTitle || '';
            const el = document.querySelector('meta[name=\'description\']');
            el?.setAttribute('content', data.data?.appDescription || '');
        });
    }, []);

    return (
        <>
            <ErrorInfo/>
            {healthState?.up ?
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
            }
        </>
    )
}

export default App
