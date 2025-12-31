import React from "react";
import "../styles/watch.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, Link } from "react-router-dom";

export const Watch = () => {
  const location = useLocation();
  const video = location.state?.video; // ✅ FIXED

  return (
    <div className="watch">
      <Link to="/" className="back-link">
        <div className="back">
          <ArrowBackIcon className="arrow" />
          Home
        </div>
      </Link>

      <video
        className="video"
        autoPlay
        controls
        src={`http://localhost:8800/videos/${video}`} // ✅ FIXED
      />
    </div>
  );
};
