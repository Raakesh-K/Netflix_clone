import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";


export default function Home() {
   const month = useMemo(
      () => [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      []
    );
  
    const [userStats, setUserStats] = useState([]);
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const res = await axios.get("/api/users/stats", {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGU5YTI3NWFiOGFmMjY3MjE0ZWQxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2Njc1ODk1MSwiZXhwIjoxNzY4MDU0OTUxfQ.3BNCSJGXA1S1R6n7Cs0_0HwoBQIpuGuB5hrXi-DfPnM"
            }
          });
  
          const statsList = res.data.sort((a, b) => a._id - b._id);
  
          const formattedStats = statsList.map((item) => ({
            name: month[item._id - 1],
            "New User": item.total
          }));
  
          setUserStats(formattedStats);
          console.log(formattedStats); // ✅ SAME AS LAMA DEV
  
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchStats();
    }, [month]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
