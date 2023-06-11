import { useState } from "react";
import { useCollapse } from "react-collapsed";
import "../css/Counselling.css";
import Navbar from "../components/Navbar";

const defaultData = [
  {
    name: "Abhay",
    age: 25,
    district: "Kosaragod",
    stress_level: 9,
    familiarity: "Moderate",
    substance_used: ["Weed", "Alcohol"],
    drug_offer: "Yes, occasionally",
    isBooked: "Yes",
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
  {
    name: "Rishabh",
    age: 20,
    stress_level: 8,
    district: "Kosaragod",
    familiarity: "Moderate",
    isBooked: "Yes",
    substance_used: ["Nicotine", "Alcohol"],
    drug_offer: "Yes, occasionally",
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
  {
    age: 20,
    stress_level: 8,
    name: "Rishabh",
    district: "Kosaragod",
    familiarity: "Moderate",
    isBooked: "Yes",
    drug_offer: "Yes, occasionally",
    substance_used: ["Nicotine", "Alcohol"],
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
  {
    stress_level: 9,
    name: "Abhay",
    district: "Thiruvananthapuram",
    age: 25,
    drug_offer: "Yes, occasionally",
    familiarity: "Moderate",
    substance_used: ["Alcohol"],
    isBooked: "Yes",
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
  {
    name: "Rishabh",
    age: 20,
    stress_level: 8,
    district: "Kosaragod",
    isBooked: "Yes",
    familiarity: "Moderate",
    substance_used: ["Nicotine", "Alcohol"],
    drug_offer: "Yes, occasionally",
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
  {
    name: "Rishabh",
    district: "Kosaragod",
    age: 20,
    stress_level: 8,
    substance_used: ["Nicotine", "Alcohol"],
    familiarity: "Moderate",
    drug_offer: "Yes, occasionally",
    isBooked: "Yes",
    form: {
      _firestore: {
        projectId: "code-to-give-breads",
      },
      _path: {
        segments: ["forms", "IQmuSbtWIwIWwbcgVOTj"],
      },
      _converter: {},
    },
  },
];
function Collapsible({ element }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const propArray = [];
  for (let prop in element) {
    if (prop === "name") continue;
    if (prop === "form") {
      propArray.push({ key: prop, value: element[prop]["_path"].segments[1] });
      continue;
    }
    if (Array.isArray(element[prop])) {
      let s = "";
      for (let val in element[prop]) s = s + " " + element[prop][val];
      propArray.push({ key: prop, value: s });
    }
    propArray.push({ key: prop, value: element[prop] });
  }
  return (
    <div className="collapsible">
      <Navbar />
      <div className="header" {...getToggleProps()}>
        {element.name}
      </div>
      <div {...getCollapseProps()}>
        <div className="content-holder">
          {propArray.map((data) => {
            return (
              <div className="content">
                {data.key} : {data.value}{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default function Counselling() {
  const [data, setData] = useState(defaultData);
  return (
    <section className="counselling">
      <h1
        className="text-3xl font-semibold text-neutral-600"
        style={{
          gridArea: "heading",
        }}
      >
        Counselling
      </h1>
      <div className="data-holder">
        {data.map((element, i) => {
          return <Collapsible key={`counselling${i}`} element={element} />;
        })}
      </div>
    </section>
  );
}
