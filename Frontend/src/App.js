import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./layout/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import TicketsList from "./tickets/pages/TicketsList";
import TicketDetails from "./tickets/pages/TicketDetails";
import CreateTicket from "./tickets/pages/CreateTicket";

import UsersList from "./users/pages/UsersList";
import PendingApprovals from "./users/pages/PendingApprovals";
import UserProfile from "./users/pages/UserProfile";

import AdminDashboard from "./admin/AdminDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";

import RootRedirect from "./layout/RootRedirect";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route path="/users" element={<UsersList />} />
        <Route
          path="/users/pending"
          element={<PendingApprovals />}
        />
        <Route path="/tickets/create" element={<CreateTicket />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={["EMPLOYEE"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
