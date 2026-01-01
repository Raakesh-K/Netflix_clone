import React, { useState, useEffect } from "react";
import "./styles/home.scss";
import { Navbar } from "./components/navbar";
import { Featured } from "./components/featured/featured";
import { List } from "./components/list";
import axios from "axios";

export const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGU5YTI3NWFiOGFmMjY3MjE0ZWQxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2Njc1ODk1MSwiZXhwIjoxNzY4MDU0OTUxfQ.3BNCSJGXA1S1R6n7Cs0_0HwoBQIpuGuB5hrXi-DfPnM",
            },
          }
        );

        setLists(res.data);
      } catch (err) {
        console.log("API Error:", err);
      }
    };

    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};
