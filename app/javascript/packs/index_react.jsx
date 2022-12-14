import React from 'react'
import App from "../components/App";
import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.getElementById('root'));
  const root = createRoot(container);
  root.render(<App />);
})