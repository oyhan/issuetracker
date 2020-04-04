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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";
import Notifier from "./infrastructure/Helper/Showsnack"
import "assets/css/material-dashboard-react.css?v=1.8.0";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "components/ErrorBoundry/ErrorBoundry";
import RTL from "infrastructure/RTL";
import { enableRtl } from "@syncfusion/ej2-base";
import LoginPage from "views/LoginPage/LoginPage";
import RegisterPage from "views/RegisterPage/RegisterPage";
import ConfirmEmail from "views/RegisterPage/ConfirmEmail";
import { StateProvider } from "store/appState";
import { initialState } from "store/appState";
import mainReducer from "reducer";
import Home from "views/Home/Home";
import { PrivateRoute } from "infrastructure/privateRout";
import LoginRegister from "views/Login-Register/LoginRegister";
import "../src/infrastructure/Helper/localization" 
import *  as resources from "Resources";
import Client from "layouts/Client";



const hist = createBrowserHistory();
enableRtl(true);
ReactDOM.render(
  <RTL>
    <Router history={hist}>

      <SnackbarProvider maxSnack={3}>
        <Notifier />
        <ErrorBoundary>
          <StateProvider initialState={initialState} reducer={mainReducer}>


            <Switch>
              <PrivateRoute path="/admin" component={Admin} />
              <PrivateRoute path="/client" component={Client} />
              <Route path="/login-register" component={LoginRegister} />
              <Route path="/account/confirm" component={ConfirmEmail} />
              {/* <Route path="/rtl" component={RTL} /> */}
              <PrivateRoute exact path="/" component={Home} />
              
            </Switch>
          </StateProvider>
        </ErrorBoundary>
      </SnackbarProvider>
    </Router>
  </RTL>
  ,
  document.getElementById("root")
);
