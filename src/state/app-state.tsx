import React from 'react';

import ActuatorStateProvider from './actuator-state-provider';
import AuthStateProvider from './auth-state-provider';
import ConfigStateProvider from './config-state-provider';
import UiStateProvider from './ui-state-provider';

const AppState: React.FC<any> = ({children}) => {
    return (
        <ConfigStateProvider>
            <ActuatorStateProvider>
                <AuthStateProvider>
                    <UiStateProvider>
                        {children}
                    </UiStateProvider>
                </AuthStateProvider>
            </ActuatorStateProvider>
        </ConfigStateProvider>
    );
}

export default AppState;
