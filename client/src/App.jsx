import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import EditProfile from "./pages/edit";
import Dashboard from "./pages/dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/edit",
    element: <EditProfile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
