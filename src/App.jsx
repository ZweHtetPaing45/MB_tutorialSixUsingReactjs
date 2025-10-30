import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import BorrowerList from "./pages/BorrowerList";
import AddBorrower from "./pages/AddBorrower";
import BorrowerDetail from "./pages/BorrowerDetail";
import AddPayment from "./pages/AddPayment";
import PaymentList from "./pages/PaymentList";
import NavbarMobile from "./components/NavbarMobile";
import ForgetPasswordFull from "./pages/ForgetPasswordFull";
import DeleteBorrower from "./pages/deleteBorrower";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="app-shell">
      {/* <NavbarMobile /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forget-password" element={<ForgetPasswordFull />} />

          <Route path="/dashboard" element={
            <RequireAuth>
                 <NavbarMobile />
              <Dashboard />
            </RequireAuth>
          } />

          <Route path="/borrowers" element={
            <RequireAuth>
                 <NavbarMobile />
              <BorrowerList />
            </RequireAuth>
          } />

          <Route path="/borrower/add" element={
            <RequireAuth>
                 <NavbarMobile />
              <AddBorrower />
            </RequireAuth>
          } />

          <Route path="/borrower/:id" element={
            <RequireAuth>
                 <NavbarMobile />
              <BorrowerDetail />
            </RequireAuth>
          } />

          <Route path="/payment/add" element={
            <RequireAuth>
                 <NavbarMobile />
              <AddPayment />
            </RequireAuth>
          } />

          <Route path="/payments" element={
            <RequireAuth>
                 <NavbarMobile />
              <PaymentList />
            </RequireAuth>
          } />

          <Route path="/delete" element={
            <RequireAuth>
                 <NavbarMobile />
              <DeleteBorrower />
            </RequireAuth>
          } />


          <Route path="*" element={<p className="text-center">Page not found</p>} />
        </Routes>
      </div>
    </div>
  );
}