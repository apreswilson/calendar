import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorPage from './components/error/error.tsx';
import Calendar from './components/calendar/calendar.tsx';
import SignUp from './components/signup/signup.tsx';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/calendar/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/calendar/home",
    element: <Calendar />,
    errorElement: <ErrorPage />
  },
  {
    path: "/calendar/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: "/calendar/*",
    element: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
