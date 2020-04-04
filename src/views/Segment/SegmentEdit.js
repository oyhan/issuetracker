
import React, { useState, useEffect } from "react"
import { SegmentModel } from "models/SegmentModel"
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer"
import GridItem from "components/Grid/GridItem"
import GridContainer from "components/Grid/GridContainer"
import Button from "components/CustomButtons/Button.js";
import { Urls } from "infrastructure/Helper/urls"
import RTL from "infrastructure/RTL"
import ImageUploader from "components/Uploader/ImageUploader"







const SegmentEdit = (props) => {




    var [cols, setCols] = useState([]);






    useEffect(() => {

        SegmentModel.EditProperties.then(items => setCols(items));

    }
        , [])



    return (

        <RTL>
            <GridContainer>

                <GridItem xs={12} sm={12} md={4}>
                    {

                        cols.map((item, key) => {
                            item.DefaultValue = props[item.Name];
                            if (item.Name == 'ImagePath') {
                                return <ImageUploader key={key} thumbs={[{ src: item.DefaultValue, size: 12 }]} name={item.Name} endpoint={Urls.Content.Upload} />

                            }
                            return (


                                <InputRenderer key={key} {...item} />

                            )

                        })
                    }
                </GridItem>
            </GridContainer>
        </RTL>
    )
}
export default SegmentEdit ;
// export default WithData({Component : SegmentEdit ,dataSource : SegmentModel.properties ,onSubmit  : SegmentModel.handleSubmit });