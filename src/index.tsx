import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppState from './state';
import App from './app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppState>
            <App/>
        </AppState>
    </React.StrictMode>
);
