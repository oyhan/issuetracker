import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import issueLog from "./Issue.png"
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import IssueNew from 'views/Issue/IssueNew';
import { Typography, Divider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';
import AppBar from '@material-ui/core/AppBar';
import Header from 'components/Header/Header';
import { Redirect } from 'react-router-dom';
import { useStateValue } from 'store/appState';


var theme = createMuiTheme();

export default function Home() {

    const [{ user }, dispatch] = useStateValue();

    return (
        user.Roles.some(r => r.toLowerCase() == "customer") ?
            <Redirect to="/client" /> :
            <Redirect to="/admin" />



    );
}
