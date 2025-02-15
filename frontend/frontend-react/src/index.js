import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import App from './App';

const rootElement = document.getElementById('root');

// Create a root using the new createRoot API
const root = ReactDOM.createRoot(rootElement);

root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
