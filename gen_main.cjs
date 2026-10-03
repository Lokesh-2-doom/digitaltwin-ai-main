const fs = require('fs');
const path = require('path');

const mainCode = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;

fs.writeFileSync(path.join(__dirname, 'src', 'main.jsx'), mainCode, 'utf8');
console.log('Saved main.jsx');
