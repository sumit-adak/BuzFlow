import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Customers from "../pages/Customers/Customers.jsx";
import Sales from "../pages/Sales/Sales.jsx";
import Tasks from "../pages/Tasks/Tasks.jsx";
import AI from "../pages/AI/AI.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import Analytics from "../pages/Analytics/Analytics.jsx";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout.jsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <AuthLayout title="Welcome back to BizFlow" subtitle="Sign in to manage your sales, CRM & inventory.">
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout title="Start your 14-day free trial" subtitle="No credit card required. Setup your merchant hub in 2 mins.">
            <Register />
          </AuthLayout>
        }
      />

      {/* Protected Dashboard SaaS Routes */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/customers"
        element={
          <DashboardLayout>
            <Customers />
          </DashboardLayout>
        }
      />
      <Route
        path="/sales"
        element={
          <DashboardLayout>
            <Sales />
          </DashboardLayout>
        }
      />
      <Route
        path="/tasks"
        element={
          <DashboardLayout>
            <Tasks />
          </DashboardLayout>
        }
      />
      <Route
        path="/ai"
        element={
          <DashboardLayout>
            <AI />
          </DashboardLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
