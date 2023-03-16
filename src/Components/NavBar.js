import React from "react";
function NavBar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/home">
        Book Hotel
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          {user ? (
            <>
              <div className="dropdown mr-5">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <div
                  className="dropdown-menu mr"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/bookings">
                    Bookings
                  </a>
                  <a className="dropdown-item" onClick={logOut} href="/#">
                    Log Out
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <a className="nav-item nav-link active" href="/register">
                Register
              </a>
              <a className="nav-item nav-link active" href="/login">
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
