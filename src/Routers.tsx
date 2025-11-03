import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import TestPage from './Pages/TestPage';
import MasterPage from './Pages/MasterPage';
import NotFoundPage from './Pages/NotFoundPage';

const Routers = () => {
  // const basename = 'url';
  const routes = [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/test',
      element: <TestPage />,
    },
    {
      path: '/master',
      element: <MasterPage />,
    },
    {
      path: '/404',
      element: <NotFoundPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routers;
