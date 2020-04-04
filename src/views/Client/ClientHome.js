import React from 'react';
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import issueLog from "./Issue.png"
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import IssueNew from 'views/Issue/IssueNew';
import { Typography, Divider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Header from 'components/Header/Header';
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '95%'
        },
        width: '70%',
        margin: '50px  auto'
    },
    issueImage: {
        maxWidth: 500,
        maxHeight: 400
    },
    text: {
        margin: 20
    }

}));

export default function ClientHome(){
    const classes = useStyles();


    return (
        <React.Fragment>

           <AppBar>
             <AdminNavbarLinks />

           </AppBar>
           
            
                <GridContainer >
                <GridItem xs={12}>
                    <Typography className={classes.text} variant='h5'  align='center' color='primary' >
                        به سامانه دریافت مشکلات و ثبت درخواست های شرکت پویان سیستم خوش آمدید.
                    
                    </Typography>
                    <Typography className={classes.text} align='center' variant='caption' color='error' >
                        این سامانه در حال حاضر به صورت آزمایشی راه‌اندازی شده است.پیشاپیش از این‌که مارا در جهت بهبود ارائه خدمات همراهی می‌کنید متشکریم.
                    
                    </Typography>
                    <Divider/>

                </GridItem>
                <GridItem xs={12} md={6}>

                    <IssueNew />

                </GridItem>
                <GridItem xs={12} md={6}>
                    <img className={classes.issueImage} src={issueLog} />
                </GridItem>
            </GridContainer>

        </React.Fragment>
    )
}



