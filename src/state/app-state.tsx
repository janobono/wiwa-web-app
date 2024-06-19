import { ReactNode } from 'react';

import AppStateProvider from './app';
import AuthStateProvider from './auth';
import DialogStateProvider from './dialog';
import HealthStateProvider from './health';
import ResourceStateProvider from './resource';
import ErrorStateProvider from './error';

const AppState = ({children}: { children: ReactNode }) => {
    return (
        <ErrorStateProvider>
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
        </ErrorStateProvider>
    );
}

export default AppState;
