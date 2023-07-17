import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles.css"
import {BrowserRouter, RouterProvider,createBrowserRouter} from "react-router-dom"
import NotePage, { loader as notePageLoader } from './NotePage';
import Home from './pages/Home';
import About from './pages/About';
import AuthProvider from "./contexts/AuthContext";
import Login, { action as loginAction } from "./routes/auth/Login";
import Signup, { action as signupAction } from "./routes/auth/Signup";
import Root, { loader as rootLoader } from "./routes/root";




const router= createBrowserRouter ([
  
  {
    path: "/",
    
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    loader: rootLoader,
    loader: notePageLoader,
  },
  { 
    path: "/About",
    element: <About />,
  },
  { 
    path: "/note/:taskId",
    element: (
      <ProtectedRoute>
        <NotePage />
      </ProtectedRoute>
    ),
    loader: notePageLoader,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
  },

]);
  


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
