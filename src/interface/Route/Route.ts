export interface Route {
  path: string;
  element: JSX.Element;
  auth?: boolean;
}
