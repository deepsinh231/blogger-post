import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Addpost, Allpost, Editpost, HomePage, Login, Post, Signup } from './Pages';
import { Protected } from './Components/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: (
          <Protected authetication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authetication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: '/all-post',
        element: (
          <Protected authetication>
            <Allpost />
          </Protected>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authetication>
            {" "}
            <Editpost />
          </Protected>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authetication>
            {" "}
            <Post />
          </Protected>
        )
      },
      {
        path: '/add-post',
        element: (
          <Protected authetication>
            {" "}
            <Addpost />
          </Protected>
        )
      },

    ]
  },
]);
ReactDOM.createRoot(document.getElementById('Deepsinh')).render(

  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
