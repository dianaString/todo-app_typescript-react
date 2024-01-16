import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import './styles/index.scss'
import './styles/style.scss'
import { BrowserRouter } from 'react-router-dom';

const basePath = window.location.pathname.replace(/\/$/, '');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App/>
   </BrowserRouter>
  </React.StrictMode>,
)
