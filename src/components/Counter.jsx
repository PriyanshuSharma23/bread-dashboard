import React from "react";
import "../css/Counter.css";
import NumberAnimation from "./NumberAnimation";

function Counter({ selectedIndex, data }) {
  return (
    <div className="outer-counter">
      <div className="counter1">
        <div className="img1"></div>
        <div className="over-box">
          <h3 className=" text-xs leading-normal"># Filled till date</h3>
          <h1 className="mx-auto text-center">
            <NumberAnimation
              startNumber={0}
              endNumber={data[selectedIndex].forms_filled}
              intervalDuration={40}
            />
          </h1>
        </div>
      </div>

      <div className="counter1">
        <div className="img2"></div>
        <div className="over-box">
          <h3 className=" text-xs leading-normal">Registration Rate</h3>
          <h1 className="mx-auto text-center">
            <NumberAnimation
              startNumber={0}
              endNumber={data[selectedIndex].counselling}
              intervalDuration={140}
            />
          </h1>
        </div>
      </div>

      <div className="counter1">
        <div className="img1"></div>
        <div className="over-box">
          <h3 className=" text-xs leading-normal">Wish to Volunteer</h3>
          <h1 className="mx-auto text-center">
            <NumberAnimation
              startNumber={0}
              endNumber={data[selectedIndex].volunteer}
              intervalDuration={140}
            />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Counter;
