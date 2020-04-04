/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import { Note } from "@material-ui/icons";
import ConsoleLogs from "views/ConsoleLogs/ConsoleLogs";
import IssueTypePage from "views/IssueType/IssueTypePage";
import SegmentPage from "views/Segment/SegmentPage";
import IssueNew from "views/Issue/IssueNew";
import IssueList from "views/Issue/IssueList";
import LoginPage from "views/LoginPage/LoginPage";
import PersonnelPage from "views/Personnel/PersonnelPage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "داشبورد",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  }
  ,
 
  {
    path: "/issuetype",
    name: "Issue Type",
    rtlName: "نوع مشکل",
    icon: Person,
    component: IssueTypePage,
    layout: "/admin"
  },
  
  {
    path: "/issue",
    name: "Issue",
    rtlName: "درخواست پشتیبانی",
    icon: Person,
    component: IssueNew,
    layout: "/admin"
  },
  {
    path: "/personnel",
    name: "Personnel",
    rtlName: "پرسنل",
    icon: Person,
    component: PersonnelPage,
    layout: "/admin"
  },
  {
    path: "/issueList",
    name: "Issue List",
    rtlName: "لیست درخواست ها",
    icon: Person,
    component: IssueList,
    layout: "/admin"
  },
  
  {
    path: "/login",
    name: "Login",
    rtlName: "درخواست پشتیبانی",
    icon: Person,
    component: LoginPage,
    layout: "/admin"
  },
  {
    path: "/segment",
    name: "Segment",
    rtlName: "بخش",
    icon: "content_paste",
    component: SegmentPage,
    layout: "/admin",
  },
  {
    path: "/logs",
    name: "Console Log",
    rtlName: "لاگ های کنسول",
    icon:Note ,
    component: ConsoleLogs,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "هشدارها",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
