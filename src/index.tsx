import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './app';
import AppProvider from './context/provider/app';
import AuthProvider from './context/provider/auth';
import DialogProvider from './context/provider/dialog';
import ErrorProvider from './context/provider/error';
import HealthProvider from './context/provider/health';
import ResourceProvider from './context/provider/resource';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorProvider>
            <AppProvider>
                <ResourceProvider>
                    <DialogProvider>
                        <HealthProvider>
                            <AuthProvider>
                                <App/>
                            </AuthProvider>
                        </HealthProvider>
                    </DialogProvider>
                </ResourceProvider>
            </AppProvider>
        </ErrorProvider>
    </React.StrictMode>
)
