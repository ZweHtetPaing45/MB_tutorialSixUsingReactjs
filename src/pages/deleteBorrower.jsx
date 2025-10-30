import React, { useState } from "react";
import api from "../services/api"; // axios instance with baseURL already defined

export default function DeleteBorrower() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!name.trim()) {
      alert("Please enter borrower name");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.delete("/delete", {
        headers: { Authorization: `Bearer ${token} `},
        data: { name }, // DELETE requests use 'data' for body
      });

      if (res.data && res.data.success) {
        setMessage("✅ Deleted successfully!");
      } else {
        setMessage("❌ Failed to delete borrower");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ Server error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-mobile p-4 mt-3 shadow-sm">
      <h5 className="mb-3 text-center">Delete Borrower</h5>

      <div className="mb-3">
        <label className="form-label fw-bold">Borrower Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter borrower name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        onClick={handleDelete}
        className="btn btn-danger w-100"
        disabled={loading}
      >
        {loading ? "ခနစောင့်ပါ..." : "အကြွေးကြေသူဖျက်ရန်"}
      </button>

      {message && (
        <div
          className={`alert mt-3 ${
            message.includes("✅") ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}