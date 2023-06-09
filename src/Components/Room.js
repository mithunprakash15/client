import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal, Button, Carousel } from "react-bootstrap";
function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs" >
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="Hotel" />
      </div>
      <div className="col-md-7" >
        <h1>{room.name}</h1>
        <p>{room.description}</p>
        <div style={{ float: "right" }}>
          {fromdate &&
            todate &&
            JSON.parse(localStorage.getItem("currentUser")) && (
              <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                <button className="btn btn-primary m-2">Book Now</button>
              </Link>
            )}

          <button className="btn btn-primary " onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={room.imageurls}> 
                  <img className="d-block w-100 bigimg" src={url} alt="Hotel" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Room;
