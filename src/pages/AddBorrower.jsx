import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddBorrower() {
  const [form, setForm] = useState({ name: "", price: "", rate: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/borr/borrower", form);
      // alert("Borrower added");
      nav("/borrowers");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Add borrower failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-mobile p-3 form-small">
      <h4 className="mb-3 text-center">Add Borrower</h4>
      <form onSubmit={submit}>
        <input name="name" className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
        <input name="price" className="form-control mb-2" placeholder="Price (e.g., 10000)" value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})} required />
        <input name="rate" className="form-control mb-3" placeholder="Rate (%)" value={form.rate} onChange={(e)=>setForm({...form, rate: e.target.value})} required />
        <button className="btn btn-success w-100" disabled={loading}>{loading ? "ပေါင်းထည့်နေသည်..." : "ငွေချေးသူထပ်ထည့်ရန်"}</button>
      </form>
    </div>
  );
}