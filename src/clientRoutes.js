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
import ClientIssueList from "views/Client/Issue/ClientIssueList";
import LoginPage from "views/LoginPage/LoginPage";
import PersonnelPage from "views/Personnel/PersonnelPage";
import ClientHome from "views/Client/ClientHome";

const clientRoutes = [
  {
    path: "/home",
    name: "New Issue",
    rtlName: "درخواست جدید",
    icon: Person,
    component: ClientHome,
    layout: "/client"
  },
   {
    path: "/issueList",
    name: "Issue List",
    rtlName: "لیست درخواست ها",
    icon: Person,
    component: ClientIssueList,
    layout: "/client"
  },
 
  

];

export default clientRoutes;
