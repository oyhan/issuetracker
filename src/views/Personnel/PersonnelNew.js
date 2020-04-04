
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







const PersonnelNew = (props) => {


    
    // var [cols, setCols] = useState([]);

    const { data, onSubmit } = props;
    

    const footer =
        <Button type="submit" color="primary">Register</Button>



    // useEffect(() => {

    //     PersonnelModel.properties.then(items => setCols(items))
    // }
    //     , [])



    return (
        // <form onSubmit={PersonnelModel.handleSubmit} >
        <form onSubmit={onSubmit} >
            {/* <Container title={PersonnelModel.Title} description={"Add a new customer"} footer={footer} > */}

            <GridContainer>


                {

                    data.map((item, key) => {

                        return (
                            <GridItem xs={12} sm={12} md={4}>

                                <InputRenderer key={key} {...item} />
                            </GridItem>
                        )

                    })
                }
            </GridContainer>


            {footer}

            {/* </Container> */}
        </form>

    )
}

// export default <WithData  Component={ PersonnelNew}  dataSource= {PersonnelModel.NewProperties}  componentSubmit={PersonnelModel.handleSubmit}/>;

export default WithData({Component : PersonnelNew ,dataSource : PersonnelModel.NewProperties ,onSubmit  : PersonnelModel.handleSubmit });