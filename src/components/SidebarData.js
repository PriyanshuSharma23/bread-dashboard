import React from "react";
import * as AiIcons from "react-icons/ai";
import * as DiIcons from "react-icons/di";

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
];
