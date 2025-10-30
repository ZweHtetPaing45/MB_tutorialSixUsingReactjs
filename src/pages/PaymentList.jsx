import React, { useState } from "react";
import api from "../services/api";

export default function PaymentList() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [totalRemailPrice, setTotalRemailPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/payment/payList", { name });
      console.log("Response => ", res.data);
      setList(res.data.list || []);
      setTotalPay(res.data.totalPay || 0);
      setTotalRemailPrice(res.data.totalRemailPrice || 0);
      setTotalAmount(res.data.totalAmount || 0);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-mobile p-3">
      <h5 className="mb-3">Payment Search</h5>

      {/* Search Form */}
      <form className="d-flex gap-2 mb-3" onSubmit={search}>
        <input
          className="form-control"
          placeholder="Borrower name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" style={{width: '150px'}} disabled={loading}>
          {loading ? "ရှာနေသည်..." : "ရှာရန်"}
        </button>
      </form>

      {/* Show Totals */}
      <div className="mb-3">
        <p><strong>ဆပ်ထားသေားငွေများ //</strong> {totalPay}</p>
        <p><strong>ဆပ်ရန်ကျန်သောငွေ //</strong> {totalRemailPrice}</p>
        <p><strong>ဆပ်ရန်ငွေများ //</strong> {totalAmount}</p>
      </div>

      {/* Payment Table */}
      {loading ? (
        <p>Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-muted">No payments found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-primary text-center">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Day</th>
                <th>Date</th>
                <th>Day Price</th>
                {/* <th>Created At</th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {list.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name || p.borrowerName}</td>
                  <td>{p.price}</td>
                  <td>{p.day}</td>
                  <td>{p.date
                      ? new Date(p.date).toLocaleDateString()
                      : "-"}</td>
                  <td>{p.dayPrice}</td>
                  {/* <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}