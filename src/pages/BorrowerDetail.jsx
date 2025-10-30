import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, Link } from "react-router-dom";

export default function BorrowerDetail() {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async () => {
      try {
        // try dedicated endpoint first
        let res;
        try {
          res = await api.get(`/borr/borrower/${id}`);
          setBorrower(res.data.BorrowerDetail);
        } catch  {
          const all = await api.get("/borr/allBorrower");
          const found = (all.data || []).find(x => (x._id || x.id) === id);
          setBorrower(found);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load borrower data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="card card-mobile p-3">Loading...</div>;
  if (!borrower) return <div className="card card-mobile p-3">Borrower not found</div>;

  return (
    <div className="card card-mobile p-3">
      <h5 className="mb-2">{borrower.name}</h5>
      <p className="mb-1">Price: {borrower.price}</p>
      <p className="mb-3">Rate: {borrower.rate}%</p>

      <div className="d-flex gap-2 mb-3">
        <Link to="/payment/add" state={{ borId: borrower._id || borrower.id }} className="btn btn-sm btn-primary">Add Payment</Link>
        <Link to="/borrowers" className="btn btn-sm btn-outline-secondary">Back</Link>
      </div>

      <h6 className="mt-2">Payment History</h6>
      {borrower.payments && borrower.payments.length > 0 ? (
        <ul className="list-group">
          {borrower.payments.map((p, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <div>
                <div>Amount: {p.price || p.amount}</div>
                <small>{p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}</small>
              </div>
              <div>
                <small>{p.day ? `Day ${p.day}` : ""}</small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No payments found.</p>
      )}
    </div>
  );
}