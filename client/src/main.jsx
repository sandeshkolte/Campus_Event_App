import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Provider>
    </StrictMode>
  </BrowserRouter>
)
