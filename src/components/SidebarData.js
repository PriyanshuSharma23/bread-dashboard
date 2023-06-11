import React from "react";
import { AiOutlineForm, AiOutlineUser } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
import { MdVolunteerActivism } from "react-icons/md";

export const SidebarData = [
  {
    title: "Form Builder",
    path: "/forms",
    icon: <AiOutlineForm className="stroke-current" />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DiGoogleAnalytics className="stroke-current" />,
    cName: "nav-text",
  },
  {
    title: "Counselling",
    path: "/counselling",
    icon: <AiOutlineUser className="stroke-current" />,
    cName: "nav-text",
  },
  {
    title: "Volunteer",
    path: "/volunteer",
    icon: <MdVolunteerActivism className="stroke-current" />,
    cName: "nav-text",
  },
];
