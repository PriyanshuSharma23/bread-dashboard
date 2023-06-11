import "../css/Dashboard.css";
import axios from "axios";
import MapComponent from "../components/MapComponent";
// import DataComponent from "../components/DataComponent";
import React, { useState, useEffect } from "react";
import Autocomplete from "../components/autocomplete";
import Counter from "../components/Counter";
import Bar from "../components/bar";
import Pie2 from "../components/pie2";
import Navbar from "../components/Navbar";

const raw_data = [
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 1,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 0,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 1,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 0,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 1,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 0,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 1,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 0,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 0,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  {
    counselling: 1,
    substanceUsed: [
      {
        bar: 1,
        color: "#661515",
        category: "Alcohol",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "Weed",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "LSD",
      },
      {
        bar: 1,
        color: "#FF8042",
        category: "Nicotine",
      },
    ],
    volunteer: 1,
    forms_filled: 1,
    ageGroup: [
      {
        bar: 1,
        color: "#661515",
        category: "Below 18",
      },
      {
        bar: 0,
        color: "#00C49F",
        category: "18-20",
      },
      {
        bar: 0,
        color: "#FFBB28",
        category: "21-23",
      },
      {
        bar: 0,
        color: "#FF8042",
        category: "24+",
      },
    ],
  },
  ,
];

const district = [
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pattanamtitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

function Dashboard() {
  const [data, setData] = useState(raw_data);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("Alappuzha");

  const handleSelection = (index) => {
    setSelectedIndex(index);
  };

  const handleDistrict = (district_name) => {
    // console.log(district.indexOf(district_name))
    setSelectedDistrict(district_name);
    handleSelection(district.indexOf(district_name));
  };

  useEffect(() => {
    (async () => {
      const dat = await axios.get(
        "https://code-to-give.onrender.com/analytics/dashboard"
      );
      setData(dat.data.data);
    })();
    return () => {};
  }, []);
  return (
    <div className="outer-box">
      <Navbar />
      <div class="analytics-container">
        <h1
          className="text-3xl font-semibold text-neutral-600"
          style={{
            gridArea: "heading",
          }}
        >
          Analytics Dashboard
        </h1>
        <div id="search">
          <Autocomplete
            district={district}
            selectedIndex={selectedIndex}
            handleSelection={handleSelection}
          />
        </div>
        <div id="counter">
          <Counter selectedIndex={selectedIndex} data={data} />
        </div>
        <div id="map">
          <MapComponent
            data={data}
            district={district}
            handleDistrict={handleDistrict}
            selectedDistrict={selectedDistrict}
          />
        </div>
        <div id="bar-graph">
          <Bar data={data[selectedIndex].substanceUsed} />
        </div>
        <div id="piechart1">
          <h3 className="pie-chart-heading">Substance wise distribution</h3>
          <Pie2 data={data[selectedIndex].substanceUsed} />
        </div>
        <div id="piechart2">
          <h3 className="pie-chart-heading">Age wise distribution</h3>
          <Pie2 data={data[selectedIndex].ageGroup} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
