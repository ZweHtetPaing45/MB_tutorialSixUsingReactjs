import React from "react";
import { Link} from "react-router-dom";

export default function NavbarMobile() {
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to={token ? "/dashboard" : "/login"} className="navbar-brand fw-bold">
          MBApp
        </Link>

        <div>
          {token ? (
            <>
              <div className="text-center">
              <Link to='/dashboard' className="btn btn-sm btn-outline-primary me-1">Home</Link>
              <Link to="/borrowers" className="btn btn-sm btn-outline-primary me-1">ချေးငွေယူထားတဲ့စာရင်း</Link>
              <Link to="/payments" className="btn btn-sm btn-outline-success me-1">ချေးထားသူ၏စာရင်း</Link>
              {/* <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button> */}
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}