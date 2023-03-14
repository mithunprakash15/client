import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";

function BookingScreen() {
  const params = useParams();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [BookNow, setBook] = useState("Book Now");
  useEffect(() => console.log(BookNow), [BookNow]);
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");
  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      const asyncFn = async () => {
        const data = await axios.post("/api/rooms/getroombyid", {
          room: params.roomid,
        });
        console.log(data.data);
        setRoom(data.data);
        setLoading(false);
      };
      asyncFn();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, []);

  function bookRoom() {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser")).name,
      fromdate,
      todate,
      totalDays,
    };
    try {
      const asyncFn = async () => {
        const result = await axios.post(
          "/api/bookings/bookroom",
          bookingDetails
        );
      };
      asyncFn();
    } catch (error) {
      console.log("bookerror");
    }
    setBook("BOOKED");
    navigate("/bookings");
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader></Loader>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col md-5">
              {newFunction()}
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <div>
                  <h1>Booking Details</h1>
                  <hr />
                  <b>
                    <p>
                      Name :{" "}
                      {JSON.parse(localStorage.getItem("currentUser")).name}
                    </p>
                    <p>From :{params.fromdate}</p>

                    <p>To : {params.todate}</p>
                  </b>
                </div>
                <br></br>
                <hr></hr>
                <div>
                  <h1>Total Days :{totalDays}</h1>
                </div>

                <div>
                  <Link to="/bookings">
                    <button className="btn btn-primary" onClick={bookRoom}>
                      {BookNow}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );

  function newFunction() {
    return <h1>{room.name}</h1>;
  }
}

export default BookingScreen;
