import { Route } from "@/interface/Route/Route";
import { HOME_ROUTE, LOG_IN_ROUTE, SIGN_UP_ROUTE, TASK_LIST_ROUTE, TASK_TABLE_ROUTE } from "@/configs/path-consts";
import { HomePage, SignupPage, LoginPage, TablePage, ListPage } from "@/configs/lazy-load";
import ErrorPage from "@/views/ErrorPage/ErrorPage";

const publicRoutes: Route[] = [
  {
    path: LOG_IN_ROUTE,
    element: <LoginPage />,
  },
  {
    path: SIGN_UP_ROUTE,
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
];

const privateRoutes: Route[] = [

  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },

  {
    path: TASK_TABLE_ROUTE,
    element: <TablePage />,
  },

  {
    path: TASK_LIST_ROUTE,
    element: <ListPage />,
  },
  
];

export { publicRoutes, privateRoutes };
