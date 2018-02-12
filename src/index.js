// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import React from 'react';
import App from './App';
import './styles/main.css';

ReactDOM.render(
<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>, document.getElementById('root'));
// registerServiceWorker();
