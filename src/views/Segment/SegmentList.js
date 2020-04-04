import React, { Fragment, useState } from 'react'
import { SegmentModel } from 'models/SegmentModel';
import CustomGrid from 'components/DataGrid/Grid';
import { CommandColumn } from '@syncfusion/ej2-react-grids';
import { Redirect } from "react-router-dom";

import Button from "components/CustomButtons/Button.js";
// import SegmentPage from '../SegmentPage';
import { createBrowserHistory } from "history";
import SegmentEdit from './SegmentEdit';






export default function SegmentList(props) {
   


    const [customerId] = useState(null);

    const prop= props;
    
    return (
        customerId && <Redirect to={`${props.match.path}/clients/${customerId}`} /> ||
        <Fragment>

            <CustomGrid
                edit
                delete
                // gridService={[CommandColumn]}
                // addCol={
                //     ([
                //         <ColumnDirective width={130} template={showClientBtn}></ColumnDirective>,

                //         // <ColumnDirective width={130} commands={commands} ></ColumnDirective>


                //     ])
                // }
                dialogTemplate ={(props)=><SegmentEdit  {...props}/>}
                dialogEdit
                // editAction={updateSegment}
                model={SegmentModel} />
        </Fragment>


    )

}