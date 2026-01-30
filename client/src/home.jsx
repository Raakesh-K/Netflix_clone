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
          `${import.meta.env.VITE_API_URL}/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2M0NjA5YTNiZDU2YWJmMmMxN2ExMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2OTc1MjA3MywiZXhwIjoxNzcxMDQ4MDczfQ.C-cgR0w2OZ2rh4t4-_q2HCuN6loXaeMzr7jSz-68xqs",
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
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};
