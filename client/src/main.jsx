import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider,} from "react-router-dom";
import { router } from './routes/Routes';
import { Provider } from 'react-redux';
import {store} from './Featured/store/store'
import AuthProvider from './providers/AuthProvider';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
