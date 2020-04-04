import React from 'react'
import { BugReport, Person, List, Add } from "@material-ui/icons";
import SegmentNew from "./SegmentNew";
import CustomTabs from "components/CustomTabs/CustomTabs";
import SegmentList from './SegmentList';

import { Router, Route, Switch, Redirect, Link } from "react-router-dom";
import ConsoleLogs from 'views/ConsoleLogs/ConsoleLogs';



export default function SegmentPage(props) {
  console.log('SegmentPage props: ', props);


  return (

    <Switch>
      {/* <Route path={`${props.match.path}/clients/:customerId`} component={SegmentClietns} /> */}



      <CustomTabs
        title="Segments"
        headerColor="primary"
        tabs={[
          {
            tabName: "List",
            tabIcon: List,
            tabContent: (
              <SegmentList {...props} />

            )
          },
          {
            tabName: "New",
            tabIcon: Add,
            tabContent: (
              <SegmentNew />
            )
          }

        ]}
      />
    </Switch>


  )


}