
import React, { useState, useEffect, forwardRef } from "react"
import { LogModel } from "models/LogModel"
import CustomGrid from "components/DataGrid/Grid"
import Container from "components/Content/Container"
import { IssueTypeModel } from "models/IssueTypeModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import WithData from "components/WithDataC/WithData"
import IssueTypeProperyNew from "./IssueTypeProperyNew"
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Fab } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import useGlobal from "store"
import FormDialog from "./AddIssueTypePropertyDialog"
import IssueTypePropertyNew from "./IssueTypeProperyNew"
import PropertyItem from "./PropertyItem"
import { MainService } from "services/MainService"
import { formExtractor } from "infrastructure/Helper/formExtracor"
import { formObject } from "infrastructure/Helper/formExtracor"
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import useTab from "store/tabcontrol"
import  ImageUploader  from "components/Uploader/ImageUploader"
import { Urls } from "infrastructure/Helper/urls"





const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

var issuTypeData = null;
const IssueTypeNew = (props) => {
    const [tab, actions] = useTab();

    console.log("issue type executed");
   
    const [state, setState] = useState({
        title: "",


    })
    const [dialogOpen, openDialog] = useGlobal(
        state => state.dialogOpen,
        actions => actions.openDialog
    );
    const [attributes, addAttribute] = useGlobal(
        state => state.attributes,
        actions => actions.addAttribute
    );
    const classes = useStyles();
    const [removedAttribute, resetAttribute] = useGlobal(
        state => state.removedAttribute,
        actions => actions.resetAttribute
    );
    useEffect(()=>{
        resetAttribute();
    },[])
    // var [cols, setCols] = useState([]);

    const submitIssueType = () => {

        var form = document.getElementById('issue');


        var formJson = formObject(form);
        console.log('formJson: ', formJson);
        formJson.Id = 0;
        formJson.Propertys = attributes;
        
        


        IssueTypeModel.handleSubmit(JSON.stringify(formJson)).then(() =>

            actions.setValue(0)
        );
    }

const footer =
    <Button type="button" onClick={submitIssueType} color="primary">Register</Button>

const handleChangeTitle = (event) => {
    this.setState({ title: event.target.value })
}


const handleUploadResponse =(uploadResponse)=>{
    console.log('uploadResponse: ', uploadResponse);
    // document.getElementById("ImagePath").value = uploadResponse.data.fileNames[0];
    
}
return (
    // <form onSubmit={IssueTypeModel.handleSubmit} >
    <div>

        {/* <Container title={IssueTypeModel.Title} description={"Add a new customer"} footer={footer} > */}

        <GridContainer>


            <form id="issue">

                <GridItem xs={12} sm={12} md={2}>

                    {
                        props.data.map(c => {
                            if (c.Name == 'UsersList')
                                return <InputRenderer multiple {...c} />
                            else

                                return <InputRenderer {...c} />
                        })
                    }


                    <ImageUploader name='ImagePath'  endpoint={Urls.Content.Upload} handleUploadResponse={handleUploadResponse} />
                </GridItem>
            </form>
            <GridItem xs={12} sm={12} md={12}>

                {
                    attributes.map(a => {


                        return (
                            <GridItem xs={12} sm={12} md={12}>
                                <PropertyItem item={a} readonly controled={false} />

                            </GridItem>
                        )
                    }

                    )
                }
            </GridItem>


            <GridItem xs={12} sm={12} md={2}>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={() => openDialog(true)}
                >
                    <AddIcon fontSize="inherit" />

                    اضافه کردن ویژگی
                  </Fab>
            </GridItem>

        </GridContainer>


        {footer}

        {/* </Container> */}

        <FormDialog content={<IssueTypePropertyNew />} />

    </div>



)
}
// export default <WithData  Component={ IssueTypeNew}  dataSource= {IssueTypeModel.NewProperties} />;

export default WithData({ Component: IssueTypeNew, dataSource: IssueTypeModel.NewProperties });

// var withData = React.creatClass
// export default IssueTypeNew;