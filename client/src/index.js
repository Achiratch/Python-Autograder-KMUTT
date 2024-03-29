import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'hover.css/css/hover-min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Font
import WebFont from 'webfontloader';

WebFont.load({
	google: {
		families: [ 'Roboto', 'sans-serif' ]
	}
});
//

ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
