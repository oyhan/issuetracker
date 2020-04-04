
import React, { useState, useEffect } from "react"
import { LogModel } from "models/LogModel"
import CustomGrid from "components/DataGrid/Grid"
import Container from "components/Content/Container"
import { SegmentModel } from "models/SegmentModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import WithData from "components/WithDataC/WithData"
import ImageUploader from "components/Uploader/ImageUploader"
import { Urls } from "infrastructure/Helper/urls"







const SegmentNew = (props) => {
    



    // var [cols, setCols] = useState([]);

    const { data, onSubmit } = props;

    const footer =
        <Button type="submit" color="primary">Register</Button>



    // useEffect(() => {

    //     SegmentModel.properties.then(items => setCols(items))
    // }
    //     , [])



    return (
        // <form onSubmit={SegmentModel.handleSubmit} >
        <form onSubmit={onSubmit} >
            {/* <Container title={SegmentModel.Title} description={"Add a new customer"} footer={footer} > */}

            <GridContainer>

                <GridItem xs={12} sm={12} md={4}>
                    {

                        data.map((item, key) => {

                            return (


                                <InputRenderer key={key} {...item} />
                            )

                        })

                    }
                    <ImageUploader name='ImagePath' endpoint={Urls.Content.Upload}  />
                </GridItem>

            </GridContainer>


            {footer}

            {/* </Container> */}
        </form>

    )
}
// export default <WithData  Component={ SegmentNew}  dataSource= {SegmentModel.NewProperties} componentSubmit={SegmentModel.handleSubmit} />;

// export default SegmentNew ;
export default WithData({ Component: SegmentNew, dataSource: SegmentModel.NewProperties, onSubmit: SegmentModel.handleSubmit });