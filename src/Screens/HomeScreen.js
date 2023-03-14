import React, { useState, useEffect } from "react";

import axios from "axios";
import Room from "../Components/Room";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => console.log(rooms), [rooms]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState();
  useEffect(() => console.log(fromdate), [fromdate]);
  const [todate, setToDate] = useState();
  useEffect(() => console.log(todate), [todate]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  useEffect(() => console.log(duplicateRooms), [duplicateRooms]);

  useEffect(() => {
    try {
      setLoading(true);
      const asyncFn = async () => {
        const data = await axios.get("/api/rooms/getAllRooms");
        setRooms(data.data);
        setDuplicateRooms(data.data);

        setLoading(false);
      };
      asyncFn();
    } catch (error) {
      setError(true);
      console.log(error);
      setError(false);
    }
  }, []);

  function filterByDate(dates) {
    var temproom = [];
    var availability = true;

    console.log(dates[0].format(dateFormat));

    setfromdate(dates[0].format(dateFormat));
    setToDate(dates[1].format(dateFormat));

    for (const r of duplicateRooms) {
      console.log(r.name);
      if (r.currentbookings.length > 0) {
        for (const booking of r.currentbookings) {
          if (
            (dates[0].format(dateFormat) >= booking.fromdate &&
            dates[0].format(dateFormat) <= booking.todate) || (dates[1].format(dateFormat) >= booking.fromdate &&
            dates[1].format(dateFormat) <= booking.todate) || (dates[0].format(dateFormat) < booking.fromdate && 
            dates[1].format(dateFormat) > booking.todate)
          ) {
            availability = false;
            break;
          }
        }
      }
      if (availability === true || r.currentbookings.length === 0) {
        temproom.push(r);
      }
    }
    
    setRooms(temproom);
  }

  return (
    <div className="container">
      <div className="row mt-5 mr-auto ml-auto">
        <div className="col-md-3 ">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length >= 0 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate}></Room>
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}
export default HomeScreen;