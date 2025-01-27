import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        clientId: "Ab74zan85cH7ELKyoRccF3dQGOpskL57Z6dTNKFk9JMOXGBFe5Nhn356EGil_etYyc4cXtynZrOwlGUj",
      }}
      >
    <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();