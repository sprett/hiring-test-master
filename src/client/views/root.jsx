import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from 'store/configureStore';
import '@oliasoft-open-source/react-ui-library/dist/global.css';
import 'client/views/styles/global.less';

const container = document.getElementById('content');
if (!container) throw new Error('Missing #content element');

const root = ReactDOM.createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
