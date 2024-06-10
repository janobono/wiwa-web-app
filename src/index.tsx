import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import App from './app';
import AppState from './state/app-state';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppState>
            <App/>
        </AppState>
    </React.StrictMode>,
)
