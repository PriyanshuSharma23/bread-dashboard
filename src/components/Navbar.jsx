import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

function Navbar() {
  let path = window.location.pathname;

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={`${item.cName}`}>
                  <Link
                    to={item.path}
                    className={` ${
                      item.path === path ? " border border-white" : ""
                    }`}
                  >
                    {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
