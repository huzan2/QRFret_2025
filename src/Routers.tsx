import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './styles/Layout';
import MainPage from './Pages/MainPage';
import TestPage from './Pages/TestPage';
import MasterPage from './Pages/MasterPage';
import NotFoundPage from './Pages/NotFoundPage';
import TicketPage from './Pages/TicketPage';
import SetlistPage from './Pages/SetlistPage';
import CommentPage from './Pages/CommentPage';
import ProtectedRoute from './Components/ProtectedRoute';

const Routers = () => {
  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: '/test',
          element: (
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/master',
          element: (
            <ProtectedRoute>
              <MasterPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/ticket',
          element: <TicketPage />,
        },
        {
          path: '/setlist',
          element: <SetlistPage />,
        },
        {
          path: '/comment',
          element: <CommentPage />,
        },
        {
          path: '/404',
          element: <NotFoundPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routers;
