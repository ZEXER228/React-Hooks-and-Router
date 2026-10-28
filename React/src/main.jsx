import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import Book, { loader as bookLoader } from './routes/book'
import ErrorPage from './routes/error-page'
import { action as deleteAction } from './routes/delete'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <p>Выберите книгу из списка</p> },
      {
        errorElement: <ErrorPage />,
        children: [
          { path: 'books/:bookId', element: <Book />, loader: bookLoader },
          { path: 'books/:bookId/delete', action: deleteAction },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
