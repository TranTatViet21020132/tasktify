import { lazy } from "react";

const HomePage = lazy(() => import("@/views/HomePage/HomePage"));
const LoginPage = lazy(() => import("@/views/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("@/views/SignupPage/SignupPage"));
const TablePage = lazy(() => import("@/views/TablePage/TablePage"));
const ListPage = lazy(() => import("@/views/ListPage/ListPage"));

const HackerRoom = lazy(() => import("@/components/ThreeJS/HackerRoom"));
const CanvasLoader = lazy(() => import("@/components/ThreeJS/CanvasLoader"));
const HeroCamera = lazy(() => import("@/components/ThreeJS/HeroCamera"));
const Rings = lazy(() => import("@/components/ThreeJS/Rings"));
const Cube = lazy(() => import("@/components/ThreeJS/Cube"));
const ReactLogo = lazy(() => import("@/components/ThreeJS/ReactLogo"));
const Target = lazy(() => import("@/components/ThreeJS/Target"));

export {
  HomePage,
  LoginPage,
  SignupPage,
  TablePage,
  ListPage,
  HackerRoom,
  CanvasLoader,
  HeroCamera,
  Rings,
  Cube,
  ReactLogo,
  Target
};