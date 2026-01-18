import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from "@/auth/ProtectedRoute"
import AdminLayout from "@/layouts/AdminLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"

function Placeholder({ title }: { title: string }) {
  return <div className="text-xl font-semibold">{title}</div>
}

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/categories", element: <Placeholder title="Categories (yakında)" /> },
          { path: "/products", element: <Placeholder title="Products (yakında)" /> },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
