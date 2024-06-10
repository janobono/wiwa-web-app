import { ReactNode } from 'react';

import AppStateProvider from './app';
import AuthStateProvider from './auth';
import DialogStateProvider from './dialog';
import HealthStateProvider from './health';
import ResourceStateProvider from './resource';

const AppState = ({children}: { children: ReactNode }) => {
    return (
        <AppStateProvider>
            <ResourceStateProvider>
                <DialogStateProvider>
                    <HealthStateProvider>
                        <AuthStateProvider>
                            {children}
                        </AuthStateProvider>
                    </HealthStateProvider>
                </DialogStateProvider>
            </ResourceStateProvider>
        </AppStateProvider>
    );
}

export default AppState;
