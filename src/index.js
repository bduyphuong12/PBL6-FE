import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
axios.defaults.baseURL = 'https://pbl6-film-booking.herokuapp.com/';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

