import React from 'react'
import App from "../components/App";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import store from "../store";

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.getElementById('root'));
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})