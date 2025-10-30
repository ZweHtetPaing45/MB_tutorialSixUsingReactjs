import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPasswordFull() {
  const nav = useNavigate();
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
  const [form, setForm] = useState({ email: "", phone: "", otp: "" });
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgetPassword", {
        email: form.email,
        phone: form.phone,
      });
      if (res.data.success) {
        alert(res.data.message || "OTP sent successfully!");
        setStep(2);
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & get token
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgetPasswordVertifyOTP", {
        email: form.email,
        otp: form.otp,
      });
      if (res.data.success) {
        const token = res.data.data; // JWT token
        localStorage.setItem("token", token); // Login လိုသုံးနိုင်အောင် token သိမ်း
        alert(res.data.message || "OTP verified! You are logged in.");
        // Step 3 (New Password) မလိုတော့ဘဲ dashboard သို navigate
        nav("/dashboard");
      } else {
        alert(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div style={{marginTop: "50%"}}>
     <div className="card card-mobile p-3" style={{ maxWidth: 400, margin: "20px auto"}}>
      <h4 className="mb-3 text-center">Forget Password</h4>

      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone (+959xxxxxxx)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </form>

        
      )}


      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
            required
          />
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
              
        </form>
      )}

      
    </div>

    <Link to='/login'>Login</Link>
   </div>
  );
}