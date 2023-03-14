import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
function Booking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [booking, setbooking] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(async () => {
    try {
      const rooms = await (
        await axios.post("/api/bookings/getBookingByUserId", {
          userid: user.name,
        })
      ).data;
      console.log(rooms);
      setbooking(rooms);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {booking &&
            booking.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>Check In :{booking.fromdate}</p>
                  <p>Check Out :{booking.todate}</p>
                  <p>
                    Status :{" "}
                    {booking.status == "booked" ? (
                      <Tag color="success">Confirmed</Tag>
                    ) : (
                      "Cancelled"
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Booking;
