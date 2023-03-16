import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";

import {Tag } from 'antd';
function Booking() {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState();
  const [booking, setbooking] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect( () => {
    async function check() {
    try {
      const rooms = await (
        await axios.post("/api/bookings/getBookingByUserId", {
          userid: user.name,
        })
      ).data;
      
      setbooking(rooms);
      setLoading(false);
    } catch (error) {
     
      setLoading(false);
      setError(true);
    }
  }
  check();
  },[]);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && (<Loader />)}
     
          {booking &&
           ( booking.map(booking => {
              return  <div className="bs" key={booking._id}>
                <h1>{booking.room}</h1>
                <p>Check In :{booking.fromdate}</p>
                <p>Check Out :{booking.todate}</p>
                <p>Status : {booking.status === 'booked'?<Tag color="success">Confirmed</Tag>:'Cancelled'}</p>
              </div>
            }))}
        </div>
      </div>
    </div>
  );
}
export default Booking;
