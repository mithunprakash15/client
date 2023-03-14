import React, { useEffect } from "react";
import Booking from "./Booking";
import { Tabs } from "antd";
const { TabPane } = Tabs;
function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "./login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Bookings" key="1">
          <Booking />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default ProfileScreen;
