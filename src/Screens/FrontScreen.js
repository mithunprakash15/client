import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function FrontScreen() {
  return (
    <div className="row front">
      <div className="col-md-12 text-center">
        <h2 style={{ color: "white", fontSize: "120px" }}>Book Hotel</h2>
        <Link to="/home">
          <button
            className="btn"
            style={{ color: "black", borderColor: "white" }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
export default FrontScreen;
