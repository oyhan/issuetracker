import React from 'react'
import { BugReport, Person, List, Add } from "@material-ui/icons";
import PersonnelNew from "./PersonnelNew";
import CustomTabs from "components/CustomTabs/CustomTabs";
import PersonnelList from './PersonnelList';

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import ConsoleLogs from 'views/ConsoleLogs/ConsoleLogs';
import PersonnelEdit from './PersonnelEdit';



export default function PersonnelPage(props) {
  console.log('PersonnelPage props: ', props);


  return (

    <Switch>
      {/* <Route path={`${props.match.path}/clients/:customerId`} component={PersonnelClietns} /> */}


      <Route path={`${props.match.path}/personnel/edit/:personnelId`} component={PersonnelEdit} />

      <CustomTabs
        title="Personnels"
        headerColor="primary"
        tabs={[
          {
            tabName: "List",
            tabIcon: List,
            tabContent: (
              <PersonnelList {...props} />

            )
          },
          {
            tabName: "New",
            tabIcon: Add,
            tabContent: (
              <PersonnelNew />
            )
          }

        ]}
      />
    </Switch>


  )


}