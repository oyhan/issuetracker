import React, { Fragment, useState } from 'react'
import { PersonnelModel } from 'models/PersonnelModel';
import CustomGrid from 'components/DataGrid/Grid';
import { CommandColumn } from '@syncfusion/ej2-react-grids';
import { Redirect } from "react-router-dom";

import Button from "components/CustomButtons/Button.js";
// import PersonnelPage from '../PersonnelPage';
import { createBrowserHistory } from "history";
import PersonnelEdit from './PersonnelEdit';






export default function PersonnelList(props) {
   



    const prop= props;
    const openEditPage = (args) => {
        const id = args.rowData.Id;
        props.match.params.data = args.rowData;
       
        props.history.push(`${props.match.path}/personnel/edit/${id}`,args.rowData);
    }
    return (
        // customerId && <Redirect to={`${props.match.path}/clients/${customerId}`} /> ||
        <Fragment>

            <CustomGrid
                edit
                delete
                gridService={[CommandColumn]}
                // addCol={
                //     ([
                //         <ColumnDirective width={130} template={showClientBtn}></ColumnDirective>,

                //         // <ColumnDirective width={130} commands={commands} ></ColumnDirective>


                //     ])
                // }
                // dialogTemplate ={(props)=><PersonnelEdit  {...props}/>}

                onDoubleClick={openEditPage}
                // dialogEdit
              
                model={PersonnelModel} />
        </Fragment>


    )

}