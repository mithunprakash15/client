import React from "react";
function NavBar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logOut(){
    localStorage.removeItem('currentUser');
    window.location.href='/login';

  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/home">
        Book Hotel
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          {user ? (
            <>
              <div class="dropdown mr-5">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                 {user.name}
                </button>
                <div class="dropdown-menu mr" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="/bookings">
                    Bookings
                  </a>
                  <a class="dropdown-item" onClick={logOut}>
                    Log Out
                  </a>
                  
                </div>
              </div>
            </>
          ) : (
            <>
              <a class="nav-item nav-link active" href="/register">
                Register
              </a>
              <a class="nav-item nav-link active" href="/login">
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
