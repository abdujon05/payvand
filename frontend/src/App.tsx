import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Providers } from "@/components/providers";
import ProtectedRoute from "@/components/protected-route";
import LoadingSpinner from "./components/loading-spinner";
import { routes } from "./routes/confg";
import { adminRoutes } from "./routes/admin-routes";
import AdminLayout from "./components/layout/admin-layout";
import Layout from "./components/layout";

const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const NotFound = lazy(() => import("@/pages/not-found"));

function AppContent() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute requireAdmin>
                    <route.element />
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>

          <Route path="/" element={<Layout />}                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>
                      <route.element />
                    </ProtectedRoute>
                  ) : (
                    <route.element />
                  )
                }
              />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}