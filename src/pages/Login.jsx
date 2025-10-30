import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.data;
      if (!token) {
        alert("Login succeeded but token missing in response.");
        return;
      }
      localStorage.setItem("token", token);
      // alert("Login success");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginTop : "50%"}}>

        <div className="">
      <h4 className="mb-3 text-center">Login</h4>
      <form onSubmit={submit}>
        <input
          name="username"
          className="form-control mb-2"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <div className="text-center mb-3">
          <button className="btn btn-primary w-50" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        </div>
      </form>

      {/* 🔹 Forget Password Link */}
      <p className="text-center my-2">
        <Link to="/forget-password" className="text-primary">
          Forgot Password?
        </Link>
      </p>

      {/* 🔹 Register Link */}
      <p className="text-center my-2">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>

    </div>
    
  );
}