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

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/tickets" element={<TicketsList />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/pending" element={<PendingApprovals />} />

        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/Register" replace />} />
      <Route path="*" element={<Navigate to="/Register" replace />} />
    </Routes>
  );
}
