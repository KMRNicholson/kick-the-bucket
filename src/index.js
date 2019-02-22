import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require('typeface-karla')
require('typeface-archivo')

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
