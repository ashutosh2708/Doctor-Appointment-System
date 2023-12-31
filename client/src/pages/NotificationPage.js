import React from "react";
import Sidebar from "../components/Sidebar";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, styled } from "@mui/material";
import Navbar from "../components/Navbar";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing went wrong in notifications");
    }
  };

  const { TabPane } = Tabs;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    <div className="min-h-screen bg-[#ECEFF1]">
      <Box>
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <DrawerHeader />
            <h4 className="p-3 text-center text-xl font-semibold">
              Notification Page
            </h4>
            <Tabs className="mx-2">
              <TabPane tab="Unread" key={0}>
                <div className="flex cursor-pointer justify-content-end">
                  <h4 className="p-2" onClick={handleMarkAllRead}>
                    Mark All Read
                  </h4>
                </div>
                {user?.notification.map((notificationMsg) => (
                  <div
                    className="border text-base font-normal p-2 rounded-2xl bg-sky-300 mb-1"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className=""
                      onClick={() => navigate(notificationMsg.onClickPath)}
                    >
                      {notificationMsg.message}
                    </div>
                  </div>
                ))}
              </TabPane>
              <TabPane tab="Read" key={1}>
                <div className="flex justify-content-end">
                  <h4
                    className="p-2"
                    style={{ cursor: "pointer" }}
                    onClick={handleDeleteAllRead}
                  >
                    Delete All Read
                  </h4>
                </div>
                {user?.seennotification.map((notificationMsg) => (
                  <div className="border text-base font-normal p-2 rounded-2xl bg-sky-300 mb-2">
                    <div
                      className=""
                      onClick={() => navigate(notificationMsg.onClickPath)}
                    >
                      {notificationMsg.message}
                    </div>
                  </div>
                ))}
              </TabPane>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default NotificationPage;
