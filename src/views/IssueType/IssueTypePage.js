import React from 'react'
import { List, Add } from "@material-ui/icons";
import IssueTypeNew from "./IssueTypeNew";
import CustomTabs from "components/CustomTabs/CustomTabs";
import IssueTypeList from './IssueTypeList';

import { Route, Switch } from "react-router-dom";
import IssueTypeEdit from './IssueTypeEdit';



export default function IssueTypePage(props) {
  


  return (

    <Switch>
      <Route path={`${props.match.path}/issueType/edit/:issueTypeId`} component={IssueTypeEdit} />



      <CustomTabs 
         rtlActive
        title="IssueTypes"
        headerColor="primary"
        tabs={[
          {
            tabName: "List",
            tabIcon: List,
            tabContent: (
              <IssueTypeList {...props} />

            )
          },
          {
            tabName: "New",
            tabIcon: Add,
            tabContent: (
              <IssueTypeNew />
            )
          }

        ]}
      />
    </Switch>


  )


}