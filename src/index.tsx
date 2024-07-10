import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './app';
import AppProvider from './context/provider/app';
import AuthProvider from './context/provider/auth';
import DialogProvider from './context/provider/dialog';
import ErrorProvider from './context/provider/error';
import HealthProvider from './context/provider/health';
import CommonResourceProvider from './context/provider/resource/common';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorProvider>
            <AppProvider>
                <CommonResourceProvider>
                    <DialogProvider>
                        <HealthProvider>
                            <AuthProvider>
                                <App/>
                            </AuthProvider>
                        </HealthProvider>
                    </DialogProvider>
                </CommonResourceProvider>
            </AppProvider>
        </ErrorProvider>
    </React.StrictMode>
)
