import React from "react";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
function Loader() {
  let [loading] = useState(true);

  return (
    <div style={{ marginTop: "150px" }}>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="sweet-loading text-center "
      >
        <BarLoader
          color="#000"
          loading={loading}
          cssOverride=""
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
export default Loader;
