import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import "../featured/featured.scss";

export const Featured = ({ type }) => {
  const [content, setContent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2E2Y2QyZTRmMWFiZTg4NmQ2MmQ4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2NTQzNjYyNywiZXhwIjoxNzY2NzMyNjI3fQ.sXeC0Q3nUiaBSuGWVknn6O3DO3E_Zu8bwMXnBGUSljw",
          },
        });

        const data = await res.json();
        setContent(data[0] || {});
      } catch (err) {
        console.log(err);
      }
    };

    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      <img
        src={`${import.meta.env.REACT_APP_API_URL}/${content.imgTitle}`}
        width="100%"
        alt="featured"
      />

      <div className="info">
        <span className="desc">{content.desc}</span>

        <div className="buttons">
          {/* ✅ PLAY BUTTON FIX */}
          <button
            className="play"
            onClick={() =>
              navigate("/watch", { state: { video: content.video } })
            }
          >
            <PlayArrowIcon />
            <span>Play</span>
          </button>

          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};
