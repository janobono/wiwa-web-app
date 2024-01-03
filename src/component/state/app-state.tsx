import { ReactNode } from 'react';

import AppStateProvider from './app-state-provider';
import AuthStateProvider from './auth-state-provider';
import CaptchaStateProvider from './captcha-state-provider';
import DialogStateProvider from './dialog-state-provider';
import HealthStateProvider from './health-state-provider';
import ResourceStateProvider from './resource-state-provider';
import UiStateProvider from './ui-state-provider';

const AppState = ({children}: { children: ReactNode }) => {
    return (
        <AppStateProvider>
            <ResourceStateProvider>
                <DialogStateProvider>
                    <HealthStateProvider>
                        <CaptchaStateProvider>
                            <UiStateProvider>
                                <AuthStateProvider>
                                    {children}
                                </AuthStateProvider>
                            </UiStateProvider>
                        </CaptchaStateProvider>
                    </HealthStateProvider>
                </DialogStateProvider>
            </ResourceStateProvider>
        </AppStateProvider>
    );
}

export default AppState;
