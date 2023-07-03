import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress color="success" />
    </div>
  );
};

export default Spinner;
