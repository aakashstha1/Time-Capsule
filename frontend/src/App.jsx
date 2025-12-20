import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/homePage";
import { GuestRoute, ProtectedRoute } from "./components/ProtectedRoutes";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <LandingPage />
      </GuestRoute>
    ),
  },
  {
    path: "/capsules",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
