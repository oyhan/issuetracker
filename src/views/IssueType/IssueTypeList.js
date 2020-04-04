import React, { Fragment, useState } from 'react'
import { IssueTypeModel } from 'models/IssueTypeModel';
import CustomGrid from 'components/DataGrid/Grid';
import { Redirect } from "react-router-dom";

import IssueTypeEdit from './IssueTypeEdit';
import { useHistory } from "react-router-dom";





export default function IssueTypeList(props) {
    const history = useHistory();



    const [customerId] = useState(null);


    // const showClientBtn = (props) => {

    //     const showClients = () => {
    //         // console.log('`${match.path}/clients/${props.Id}`: ', `${match.path}/clients/${props.Id}`);
    //         // Location.href=`${match.path}/clients/${props.Id}`
    //         console.log('props: ', props);
    //         // window.history.pushState(match,`Client list of${props.IssueTypeName}`,`${match.path}/clients/${props.Id}`)
    //         prop.history.push(`${prop.match.path}/clients/${props.Id}`);
    //         // setIssueTypeId(props.Id);
    const openEditPage = (args) => {
        const id = args.rowData.Id;
        props.match.params.data = args.rowData;
       
        history.push(`${props.match.path}/issueType/edit/${id}`,args.rowData);
    }

    //     }
    //     return (
    //         // <Router history={hist}>
    //         // <Link to={`${props.match.path}/logs`}>
    //         // <a href={`${match.path}/clients/${props.Id}`} >Clients</a>
    //         <Button onClick={showClients}  type="submit" round size="sm" color="info">Clients</Button>
    //         // <NavLink to={`${props.match.path}/logs`}>asdasdas</NavLink>
    //         // <LinearProgress/>
    //         //</Link> 
    //         // </Router>


    //     );
    // }
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
                dialogTemplate={(props) => <IssueTypeEdit {...props} />}
                onDoubleClick={openEditPage}
                model={IssueTypeModel} />
        </Fragment>


    )

}