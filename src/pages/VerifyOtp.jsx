import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [data, setData] = useState({ email: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/vertifyOTP", data);
      alert("Verified. Please login.");
      nav("/login");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-mobile p-3 form-small">
      <h4 className="mb-3 text-center">Verify OTP</h4>
      <form onSubmit={submit}>
        <input name="email" className="form-control mb-2" placeholder="Email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required />
        <input name="otp" className="form-control mb-3" placeholder="OTP" value={data.otp} onChange={(e) => setData({...data, otp: e.target.value})} required />
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
      </form>
    </div>
  );
}