import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from "@/auth/ProtectedRoute"
import AdminLayout from "@/layouts/AdminLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Categories from "@/pages/Categories"
import Products from "@/pages/Products"
import Consultants from "@/pages/Consultants"



const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/categories", element: <Categories /> },
          { path: "/products", element: <Products /> },
          { path: "/consultants", element: <Consultants /> },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
