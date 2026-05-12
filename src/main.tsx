import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.onerror = (msg, url, line, col, error) => {
  document.body.innerHTML = `
    <div style="padding:40px;font-family:monospace;color:red;">
      <h1>Error Loading App</h1>
      <p><strong>Message:</strong> ${msg}</p>
      <p><strong>File:</strong> ${url}:${line}:${col}</p>
      <p><strong>Stack:</strong> ${error?.stack || 'No stack'}</p>
    </div>
  `
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
