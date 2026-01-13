import React, { useEffect, useState } from "react";
import "../styles/listitem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import axios from "axios";
import { Link } from "react-router-dom";

export const Listitem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/find/${item}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjY0ZGEyOWRhYzgzZDkxMWE1M2ZjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2ODMxMjIyNiwiZXhwIjoxNzY5NjA4MjI2fQ.UeLJ4uR-YfABwcXk-kaAL_O7OJXDWUeFviuznULGQrg",
          },
        });
        setMovie(res.data || {});
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link
      to="/watch"
      state={{ video: movie.video }} // ✅ FIX
    >
      <div
        className="list-items"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${movie.img}`}
          alt={movie.title}
        />

        {isHovered && (
          <>
            <video
              src={`${import.meta.env.VITE_API_URL}/videos/${movie.video}`}
              autoPlay
              loop
              muted
            />

            <div className="iteminfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownOutlinedIcon className="icon" />
              </div>

              <div className="iteminfotop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>

              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
