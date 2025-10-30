import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddPayment() {
  const nav = useNavigate();
  const location = useLocation();

  // Prefill optional
  const prefill = location.state?.name || "";

  const [form, setForm] = useState({ name: prefill, price: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (prefill) setForm(f => ({ ...f, name: prefill }));
  }, [prefill]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/payment/payment", form);

      // Save backend returned paymentData
      setResult(res.data.data);

      // alert("Payment recorded successfully!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-mobile p-3 form-small">
      <h4 className="mb-3 text-center">Add Payment</h4>

      {/* Payment Form */}
      <form onSubmit={submit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Borrower Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          name="price"
          className="form-control mb-3"
          placeholder="Amount (e.g., 92000)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "ခနစောင့်ပါ..." : "ငွေဆပ်ရန်"}
        </button>
      </form>

      {/* Show Returned Payment Info */}
      {result && (
        <div className="card mt-4 p-3">
          <h5 className="text-center">Payment Info</h5>
          <hr />
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Day:</strong> {result.day}</p>
          <p><strong>Today Pay:</strong> {result.dayPrice}</p>
          <p><strong>Total Loan:</strong> {result.price}</p>
          <p><strong>Interest Rate:</strong> {result.rate}%</p>
          <p><strong>Total + Interest:</strong> {result.priceRate}</p>
          <p><strong>Interest Amount:</strong> {result.irtp}</p>
          <p><strong>Date:</strong> {new Date(result.createdAt).toLocaleString()}</p>

          <button
            className="btn btn-success w-100 mt-3"
            onClick={() => nav("/payments")}
          >
            View All Payments
          </button>
        </div>
      )}
    </div>
  );
}