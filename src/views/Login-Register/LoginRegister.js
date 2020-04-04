import React from 'react';
import { Paper } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import LoginPage from 'views/LoginPage/LoginPage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
import { makeStyles } from '@material-ui/styles';
import { PersonPinCircleOutlined, Add } from '@material-ui/icons';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks';


const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(4),


    },
    grid: {
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },

        margin: '50px  auto'
    }


}))


export default function LoginRegister(props) {

    const classes = useStyles();

    return (

        <React.Fragment>
            <AdminNavbarLinks />
            <GridContainer justify='center'>
                <GridItem xs={12} md={4}>
                    <Paper className={classes.paper}>

                        <CustomTabs
                            rtlActive
                            title=""
                            headerColor="primary"
                            tabs={[
                                {
                                    tabName: "ورود",
                                    tabIcon: PersonPinCircleOutlined,
                                    tabContent: (
                                        <LoginPage {...props} />

                                    )
                                },
                                {
                                    tabName: "ثبت نام",
                                    tabIcon: Add,
                                    tabContent: (
                                        <RegisterPage {...props} />
                                    )
                                }

                            ]}
                        />
                    </Paper>
                </GridItem>

            </GridContainer>
        </React.Fragment>





        //     </GridItem>
        // </GridContainer>

    )

}