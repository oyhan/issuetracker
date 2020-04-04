
import React, { useState, useEffect } from "react"
import Container from "components/Content/Container"
import { LoginModel } from "models/LoginModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import WithData from "components/WithDataC/WithData"
import { useStateValue } from "store/appState"
import { LOGIN } from "actions/userActions"
import { ShowSnack } from "infrastructure/Helper/Showsnack";
import { CircularProgress, LinearProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { green } from "@material-ui/core/colors"
import AppLoader from "components/AppLoader/AppLoader"
import { useFormik } from "formik"
import * as Yup from 'yup';
import GoogleLogin from "react-google-login"
import Axios from "axios"
import { Urls } from "infrastructure/Helper/urls"



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const LoginPage = (props) => {
    console.log('props: ', props);

    var classes = useStyles();
    const [, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    var [cols, setCols] = useState([]);

    // const { data, onSubmit } = props;
    const footer = () => {

        return (
            loading ? <AppLoader /> :

                <Button type="submit" color="primary">ورود</Button>
        )
    }

    const onSubmit = (e) => {

        setLoading(true);
        if (!formik.isValid) return;
        LoginModel.handleSubmit(e).then(user => {

            dispatch({
                type: LOGIN,
                user: user
            })
            setLoading(false);

            // props.history.push("/");
            ShowSnack.Success(`${user.Name} به سامانه تیکتینگ پویان سیستم خوش آمدید`);

            window.location.href = "/";
        }, error => {
            setLoading(false);


            ShowSnack.Error(error)
        })

    }
    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validationSchema: Yup.object({
            Email: Yup.string()
                .email("لطفا یک ایمیل معتبر وارد کنید")
                .required("وارد کردن ایمیل اجباریست"),
            Password: Yup.string()
                .required("کلمه عبور اجباریست")
        }),
        onSubmit: onSubmit,

    })



    useEffect(() => {
        setLoading(true);
        LoginModel.properties.then(items => {
            setLoading(false);


            setCols(items)

        })
    }
        , [])

    const responsGoogle = (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;

        Axios.post(Urls.GoogleLogin, `"${id_token}"`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(respons => {
            console.log('respons: ', respons);

        })
    }


    return (
        // <form onSubmit={LoginModel.handleSubmit} >
        <GridContainer justify='center'>

            <GoogleLogin
                clientId="1017906675726-sd4m17p2bu83kb8idfv7jmkmf3u5ef3v.apps.googleusercontent.com"
                buttonText="ورود با گوگل"
                onSuccess={responsGoogle}
                onFailure={responsGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <form onSubmit={formik.handleSubmit} >
                {/* <Container title={LoginModel.Title} description={"Add a new customer"} footer={footer} > */}
                {/* <Container title={LoginModel.Title} description={""} > */}
                <GridContainer>
                    {formik.isSubmitting && <LinearProgress />}


                    {
                        cols.map((item, key) => {


                            return (
                                <GridItem key={key} xs={12} sm={12} md={12}>

                                    <InputRenderer error={formik.errors[item.Name]} onChange={formik.handleChange} Hint={formik.errors[item.Name]} key={key} {...item} />
                                </GridItem>
                            )

                        })
                    }
                </GridContainer>
                {footer()}
                {/* </Container> */}





                {/* </Container> */}
            </form>
        </GridContainer>
    )
}
export default LoginPage;
// export default WithData({ Component: LoginPage, dataSource: LoginModel.properties, onSubmit: LoginModel.handleSubmit });


