import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { GuestRoute, ProtectedRoute } from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
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
  {
    path: "*",
    element: (
      <div className="flex items-center justify-between">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    ),
  },
]);
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
