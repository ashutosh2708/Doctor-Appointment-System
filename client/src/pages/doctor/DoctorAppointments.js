import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import { Box, styled } from "@mui/material";
import Navbar from "../../components/Navbar";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor//doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" && (
            <div className="flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ml-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

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
            <h1 className="flex justify-center py-3 text-lg font-medium">
              Appointments Lists
            </h1>
            <Table
              size="small"
              scroll={{ y: "50vh" }}
              columns={columns}
              dataSource={appointments}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DoctorAppointments;
