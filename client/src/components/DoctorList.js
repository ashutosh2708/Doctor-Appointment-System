import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-white shadow-1 p-3 rounded-lg border w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <h2 className="font-medium text-lg text-gray-900 mb-2 text-center">
          Dr. {doctor.firstName} {doctor.lastName}
          </h2>
        <div className="">
          <h5 className="mb-2">
            <b>Specialization</b> - {doctor.specialization}
          </h5>
          <h5 className="mb-2">
            <b>Experience</b> - {doctor.experience} years
          </h5>
          <h5 className="mb-2">
            <b>Fees Per Cunsaltation</b> - {doctor.feesPerCunsaltation}
          </h5>
          <h5 className="mb-2">
            <b>Timings</b> - {doctor.timings[0]} - {doctor.timings[1]}
          </h5>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
