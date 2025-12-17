import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/homePage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/capsules",
    element: <HomePage />,
  },
]);
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
