import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import { Box, styled } from "@mui/material";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing went wrong ");
    }
  };
  // update doc

  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
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
            <h1 className="flex justify-center py-3 text-lg font-medium">
              Manage Profile
            </h1>
            {doctor && (
              <Form
                layout="vertical"
                onFinish={handleFinish}
                className="m-3"
                initialValues={{
                  ...doctor,
                  timings: [
                    moment(doctor.timings[0], "HH:mm"),
                    moment(doctor.timings[1], "HH:mm"),
                  ],
                }}
              >
                <h4 className="">Personal Details : </h4>
                <Row gutter={20}>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your first name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your last name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Mobile No."
                      name="phone"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your mobile number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Email"
                      name="email"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="email" placeholder="your email address" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website" name="website">
                      <Input type="text" placeholder="your website" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Address"
                      name="address"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your clinic address" />
                    </Form.Item>
                  </Col>
                </Row>
                <h4>Professional Details :</h4>
                <Row gutter={20}>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Specialization"
                      name="specialization"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your specialization" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Experience"
                      name="experience"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your experience" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item
                      label="Fees Per Cunsultation"
                      name="feesPerCunsaltation"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input type="text" placeholder="your fees" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timings" name="timings" required>
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={8}>
                    <button
                      className="btn btn-primary form-btn bg-blue-700"
                      type="submit"
                    >
                      Update
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
