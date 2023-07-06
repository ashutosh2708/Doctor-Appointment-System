import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import DoctorList from "../components/DoctorList";
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
  return (
    <Sidebar>
      <h1 className="text-center py-3 font-medium text-xl">Home Page</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {doctors && doctors.map((doctor , index) => <DoctorList doctor={doctor} key={index}/>)}
      </div>
    </Sidebar>
  );
};

export default HomePage;
