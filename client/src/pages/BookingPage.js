import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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
  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Sidebar>
      <div className="h-screen">
        <h3 className="flex justify-center py-3 text-lg font-medium">
          Booking Page
        </h3>
        {doctors && (
          <div className="w-75% grid px-6 mt-2 md:w-full md:px-64">
            <div className="border w-75% p-4 shadow-md rounded-lg md:w-full md:px-52">
              <div className="flex justify-center mb-4">
                <h4 className="text-lg font-semibold">
                  Dr. {doctors.firstName} {doctors.lastName}
                </h4>
              </div>
              <div className="grid gap-2">
                <div className="">
                  <h4 className="">Fees : {doctors.feesPerCunsaltation}</h4>
                </div>
                <div className="">
                  <h4>
                    Timings : {doctors.timings && doctors.timings[0]} -{" "}
                    {doctors.timings && doctors.timings[1]}{" "}
                  </h4>
                </div>
                <div className="">
                  <DatePicker
                    aria-required={"true"}
                    className="w-full"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      setDate(moment(value).format("DD-MM-YYYY"));
                    }}
                  />
                </div>
                <div className="">
                  <TimePicker
                    aria-required={"true"}
                    format="HH:mm"
                    className="w-full"
                    onChange={(value) => {
                      setTime(moment(value).format("HH:mm"));
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="btn btn-primary"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <button className="btn btn-success" onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default BookingPage;
