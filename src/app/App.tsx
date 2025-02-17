import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "@/configs/routes";
import MainLayout from "@/layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route element={<MainLayout />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
