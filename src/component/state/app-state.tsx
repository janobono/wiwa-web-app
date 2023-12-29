import { ReactNode } from 'react';

import AppStateProvider from './app-state-provider';
import AuthStateProvider from './auth-state-provider';
import ConfigStateProvider from './config-state-provider';
import DialogStateProvider from './dialog-state-provider';
import ResourceStateProvider from './resource-state-provider';
import UiStateProvider from './ui-state-provider';
import UnitProvider from './unit-provider';

const AppState = ({children}: { children: ReactNode }) => {
    return (
        <ConfigStateProvider>
            <AppStateProvider>
                <ResourceStateProvider>
                    <AuthStateProvider>
                        <UnitProvider>
                            <DialogStateProvider>
                                <UiStateProvider>
                                    {children}
                                </UiStateProvider>
                            </DialogStateProvider>
                        </UnitProvider>
                    </AuthStateProvider>
                </ResourceStateProvider>
            </AppStateProvider>
        </ConfigStateProvider>
    );
}

export default AppState;
