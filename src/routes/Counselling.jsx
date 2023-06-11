import { useEffect, useState } from "react";
import { useCollapse } from "react-collapsed";
import "../css/Counselling.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

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
  if (element === null || !element.name) return <></>;
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
        <div className="info-holder">
          <div className="icon-holder">
            <AiOutlineUser color="rgba(0,0,0,0.6)" />
          </div>
          <div className="personal">
            <span className="name">{element.name}</span>
            <span className="email">
              Contact {element.contact ? element.contact : ""}
            </span>
          </div>

          <a
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={"https://wa.me/" + element.contact}
            target="_blank"
            className="ml-auto grid h-12 w-12 place-content-center rounded-full text-2xl hover:bg-red-800/20 active:bg-red-800/10"
            rel="noreferrer"
          >
            <BsWhatsapp />
          </a>
          <MdOutlineExpandMore
            className="expand-icon"
            style={
              isExpanded
                ? {
                    transform: "rotate(-180deg)",
                  }
                : {}
            }
          />
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content-holder">
          {propArray.map((data) => {
            return (
              <div className="content">
                {data.key} : {data.value}
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
  useEffect(() => {
    (async () => {
      const dat = await axios.get(
        "https://code-to-give.onrender.com/counselling"
      );
      setData(dat.data.data);
    })();
  }, []);
  return (
    <section className="counselling">
      <h1
        className="text-3xl font-semibold text-neutral-600"
        style={{
          gridArea: "heading",
        }}
      >
        Counselling Enquiries
      </h1>
      <div className="data-holder">
        {data
          .filter((d) => d.contact != null)
          .map((element, i) => {
            return <Collapsible key={`counselling${i}`} element={element} />;
          })}
      </div>
    </section>
  );
}
