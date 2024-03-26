import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ProSidebarProvider } from 'react-pro-sidebar';
import {Provider} from 'react-redux'
import './index.css'
import store from './store.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
      
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
