
import React, { useState, useEffect } from "react"
import { LogModel } from "models/LogModel"
import CustomGrid from "components/DataGrid/Grid"
import Container from "components/Content/Container"
import { PersonnelModel } from "models/PersonnelModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import WithData from "components/WithDataC/WithData"
import { MainService } from "services/MainService"
import { Urls } from "infrastructure/Helper/urls"
import RTL from "infrastructure/RTL"
import { formExtractor } from "infrastructure/Helper/formExtracor"
import { ShowSnack } from "infrastructure/Helper/Showsnack"







const PersonnelEdit = (props) => {



    var entity = undefined;
    if (props.location.state)
        entity = props.location.state;
        
    var [cols, setCols] = useState([]);
    console.log('entity: ', entity);
    const { data, onSubmit } = props;


    const footer =
        <Button type="submit" color="primary">ثبت</Button>



    useEffect(() => {



        PersonnelModel.EditProperties.then(items => setCols(items));

    }
        , [])

    const submit = (event)=> {
        event.preventDefault();
        
        var formObject = formExtractor(event.target)
        
        MainService.New(Urls.Personnel.Edit,formObject).then(respons=>
            props.history.push("/admin/personnel")
        ,error => {
            ShowSnack.Error(error);

        })
    }

    return (
        <form onSubmit={submit}>
            <Container title="ویرایش" footer={footer} >
                <GridContainer>


                    {

                        cols.map((item, key) => {
                            item.DefaultValue = entity[item.Name];

                            return (
                                <GridItem xs={12} sm={12} md={4}>

                                    <InputRenderer key={key} {...item} />
                                </GridItem>
                            )

                        })
                    }
                </GridContainer>
            </Container>
        </form>

    )
}
// export default React.memo(PersonnelEdit);
export default WithData({Component : PersonnelEdit ,dataSource : PersonnelModel.EditProperties ,onSubmit  : PersonnelModel.handleSubmit });