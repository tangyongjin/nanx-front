import 'core-js/es';
import React from 'react';
import ReactDOM from 'react-dom';
import '@/styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
if (module.hot) {
    module.hot.accept();
}
serviceWorker.unregister();
