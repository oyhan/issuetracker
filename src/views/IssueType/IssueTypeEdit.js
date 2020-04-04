
import React, { useState, useEffect } from "react"
import Container from "components/Content/Container"
import { IssueTypeModel } from "models/IssueTypeModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Avatar } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import useGlobal from "store"
import FormDialog from "./AddIssueTypePropertyDialog"
import PropertyItem from "./PropertyItem"
import { MainService } from "services/MainService"
import IssueTypePropertyNew from "./IssueTypeProperyNew"
import RTL from "infrastructure/RTL"
import { Urls } from "infrastructure/Helper/urls"
import { Redirect } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Formik, FieldArray, Field } from "formik"
import ImageUploader from "components/Uploader/ImageUploader"




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

const IssueTypeEdit = (props) => {


    var globalActions = useGlobal(a => a)[1];

    var entity = undefined;
    if (props.location.state)
        entity = props.location.state;
    // else entity = props;
    const [] = useState({
        title: "",


    })
    const [, openDialog] = useGlobal(
        state => state.dialogOpen,
        actions => actions.openDialog
    );
    const [, addAttribute] = useGlobal(
        state => state.attributes,
        actions => actions.addAttribute
    );
    const [removedAttribute, resetAttribute] = useGlobal(
        state => state.removedAttribute,
        actions => actions.resetAttribute
    );
    const classes = useStyles();

    var [cols, setCols] = useState([]);
    var [redirect, setRedirect] = useState();
    var [] = useState(null);
    useEffect(() => {
        resetAttribute();
        if (!entity) {
            const id = props.match.params.issueTypeId;
            MainService.Get(Urls.IssueType.Get + id).then(issueType => {


                entity = issueType
            }).then(() => {
                IssueTypeModel.properties.then(items => setCols(items));
                entity.Propertys.map(p => addAttribute(p))

            })

        }
        else {
            IssueTypeModel.properties.then(items => setCols(items));
            entity.Propertys.map(p => addAttribute(p))
        }






    }
        , [])

    const submitIssueType = (values) => {


        // var form = document.getElementById('issue');


        // var formJson = formObject(form);
        // formJson.Propertys = attributes;

        var model = { ...values, removed: removedAttribute }





        IssueTypeModel.handleEdit(JSON.stringify(model)).then(() => {
            globalActions.resetAttribute();

            setRedirect("/admin/issueType");

        });

    }

    const footer =
        <Button type="submit" color="primary">Register</Button>

    const initialValues = {

        dto: {
            Title: entity.Title,
            SegmentId: entity.SegmentId,
            UsersList: entity.UsersList,
            Propertys: entity.Propertys,
            Id: entity.Id,
            ImagePath: entity.ImagePath
        }

    }



    return (
        redirect ? <Redirect to={redirect} /> :// <form onSubmit={IssueTypeModel.handleSubmit} >
            <RTL>
                <div>





                    <Formik initialValues={initialValues} onSubmit={submitIssueType} >
                        {
                            ({ handleSubmit, handleChange, initialValues, values, ...other }) => (


                                <React.Fragment>
                                    <form id="issue" onSubmit={handleSubmit}>
                                        <Container title="ویرایش" description={"Add a new customer"} footer={footer} >

                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={2}>

                                                    {
                                                        cols.map((c, i) => {




                                                            c.DefaultValue = initialValues.dto[c.Name];


                                                            if (c.Name == 'ImagePath')

                                                                return <Field name={`dto.${c.Name}`}   >
                                                                    {
                                                                        (props) => {

                                                                            const handleUploadDone = (response) => {
                                                                                props.form.setFieldValue(`dto.${c.Name}`, response.data.fileNames[0])
                                                                            }
                                                                            return <ImageUploader thumbs={[{ src: c.DefaultValue, size: 12 }]} name={`dto.${c.Name}`} handleUploadResponse={handleUploadDone} endpoint={Urls.Content.Upload} />

                                                                        }
                                                                    }
                                                                </Field>


                                                            // <Avatar alt={c.Name} src={c.DefaultValue} />
                                                            if (c.Name == 'UsersList')
                                                                return <InputRenderer {...c} Name={`dto.${c.Name}`} onChange={handleChange} key={i} multiple />
                                                            else

                                                                return <InputRenderer {...c} Name={`dto.${c.Name}`} onChange={handleChange} key={i} />
                                                        })
                                                    }




                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <FieldArray name="dto.Propertys"
                                                        render={(arrayHelper) => {


                                                            // setHandleAddItem(arrayHelper.push);
                                                            return <div>

                                                                <FormDialog content={<IssueTypePropertyNew handleAddItem={arrayHelper.push} />} />

                                                                {
                                                                    values.dto.Propertys && values.dto.Propertys.map((a, i) => {



                                                                        return (
                                                                            <GridItem key={i} xs={12} sm={12} md={12}>
                                                                                <PropertyItem key={i} handleRemove={arrayHelper.remove} index={i} handleChange={handleChange} item={a} readonly controled={false} />

                                                                            </GridItem>
                                                                        )
                                                                    }

                                                                    )
                                                                }
                                                            </div>

                                                        }

                                                        } />

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




                                        </Container>
                                    </form>


                                </React.Fragment>

                            )}

                    </Formik>




                </div>
            </RTL >


    )
}

export default IssueTypeEdit;

// var withData = React.creatClass
// export default IssueTypeEdit;