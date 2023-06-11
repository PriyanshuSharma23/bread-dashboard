import React from "react";
import * as AiIcons from "react-icons/ai";
import * as DiIcons from "react-icons/di";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Form Builder",
    path: "/forms",
    icon: <AiIcons.AiOutlineForm />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DiIcons.DiGoogleAnalytics />,
    cName: "nav-text",
  },
  {
    title: "Counselling",
    path: "/counselling",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text",
  },
  {
    title: "Volunteer",
    path: "/volunteer",
    icon: <MdIcons.MdVolunteerActivism />,
    cName: "nav-text",
  },
];
