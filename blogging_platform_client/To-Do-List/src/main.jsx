import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles.css"
import {BrowserRouter, RouterProvider,createBrowserRouter} from "react-router-dom"
import NotePage, { loader as notePageLoader } from './NotePage';
import Home from './pages/Home';
import About from './pages/About';




const router= createBrowserRouter ([
  {
    path: "/",
    element: <Home />,
    loader: notePageLoader,
  },
  { 
    path: "/About",
    element: <About />,
  },
  { 
    path: "/note/:taskId",
    element: <NotePage />,
    loader: notePageLoader,
  }
]);
  


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
