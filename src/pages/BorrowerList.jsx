import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function BorrowerList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/borr/allBorrower");
        setItems(res.data.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load borrowers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="card card-mobile p-3" style={{marginTop: "10%"}}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Borrowers</h5>
        <Link to="/borrower/add" className="btn btn-sm btn-primary">
          အသစ်
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-muted">No borrowers yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-primary text-center">
              <tr className="">
                <th>စဥ်</th>
                <th style={{padding: "0px 35px 5px 35px"}}>နာမည်</th>
                <th>ချေးသောငွေ</th>
                <th>အတိုး</th>
                <th>ဆပ်ရန်ငွေ</th>
                <th>အတိုးနူန်း (%)</th>
                <th>နေ့စွဲ (Date)</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {items.map((b, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{b.name}</td>
                  <td>{b.price}</td>
                  <td>{b.priceRate}</td>
                  <td>{b.irtp}</td>
                  <td>{b.rate}%</td>
                  <td>
                    {b.date
                      ? new Date(b.date).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}