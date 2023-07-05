import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
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
    <Layout>
      <h1 className="text-center py-3 font-medium text-xl">Home Page</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </div>
    </Layout>
  );
};

export default HomePage;
