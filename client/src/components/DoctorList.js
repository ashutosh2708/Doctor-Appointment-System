import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-white shadow-1 p-5 rounded-lg border w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <h2 className="font-medium text-lg text-gray-900 mb-2 text-center">
          Dr. {doctor.firstName} {doctor.lastName}
          </h2>
        <div className="">
          <p>
            <b>Specialization</b> - {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> - {doctor.experience} years
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> - {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> - {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
