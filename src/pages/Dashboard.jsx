import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{marginTop: '50%'}}>
      
    <div className="card card-mobile p-3">
      <h4 className="mb-3">Dashboard</h4>

      <div className="d-grid gap-2">
        <Link to="/borrowers" className="btn btn-lg btn-outline-primary">ချေးငွေယူထားတဲ့စာရင်း</Link>
        <Link to="/borrower/add" className="btn btn-lg btn-outline-success">ငွေချေးသူအသစ်တိုးမယ်</Link>
        <Link to="/payments" className="btn btn-lg btn-outline-warning">ချေးထားသူ၏စာရင်း</Link>
        <Link to="/payment/add" className="btn btn-lg btn-outline-info">ငွေဆပ်ရန်</Link>
        <Link to="/delete" className="btn btn-lg btn-outline-danger">အကြွေးကြေသူဖျက်ရန်</Link>
      </div>
    </div>

    </div>
  );
}