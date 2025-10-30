import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", phone: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registered. Please verify OTP (check email).");
      nav("/verify-otp");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div style={{marginTop: "50%"}}>
      <div className="card card-mobile p-3 form-small">
      <h4 className="mb-3 text-center">Register</h4>
      <form onSubmit={submit}>
        <input name="username" className="form-control mb-2" placeholder="Username" value={form.username} onChange={onChange} required />
        <input name="phone" className="form-control mb-2" placeholder="Phone (+95...)" value={form.phone} onChange={onChange} required />
        <input name="email" type="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={onChange} required />
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
      </form>

      <p className="text-center mt-3">
        Already registered? <a href="/login">Login</a>
      </p>
    </div>
    </div>
  );
}