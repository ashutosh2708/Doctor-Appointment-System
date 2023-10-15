import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorList from "../components/DoctorList";
import Sidebar from "../components/Sidebar";
import { Box, styled } from "@mui/material";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
            <div className="bg-white shadow-lg p-4 h-screen">
            <h1 className="text-center py-3 font-medium text-xl">Home Page</h1>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {doctors &&
                  doctors.map((doctor, index) => (
                    <DoctorList doctor={doctor} key={index} />
                  ))}
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
