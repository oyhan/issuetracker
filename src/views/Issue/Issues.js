import React from 'react'
import { Urls } from 'infrastructure/Helper/urls';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { MainService } from 'services/MainService';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { enableRtl } from '@syncfusion/ej2-base';
import ValueGrid from './ValueGrid';
import DataTable from './ValueGrid';
import { CustomDataAdaptor } from 'infrastructure/DataAdaptor/CustomDataAdaptor';
import { authentication } from 'services/UserService';
import IssueDetail from './IssueDetails';





export default function Issues(props) {


    const typeId = props.match.params.typeId;
    const [issues, setIssues] = React.useState([]);
    const [dataSource, setDatasource] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    React.useEffect(() => {

        MainService.GetAll(Urls.Issue.GetByTypeId + typeId).then(issues => {
            
            
            issues = issues.Issues;
            const cols = [];
            cols.push({ Name: "Id" })
           issues.length>0 &&  issues[0].Type.Propertys.map(p => (
                cols.push({


                    Name: p.Name,
                    DisplayName: p.Title
                })));

            //    const cols = [{Name: "Name",DisplayName : "نام"} ,{Name : "Pro" ,DisplayName : "تلفظ"} ]

            setColumns(cols);
            
            var values = issues.map(s => s.Values)
            
            


            var result = [];
            values.map(s => {

                const item = {};

                s.map(d => {
                    item[d.PropertyTypeName] = d.Value;
                    item.Id = d.IssueId;
                })
                result.push(item);


            }

            );

            const data = new DataManager(
                {
                    // url: this.hostUrl + 'api/Orders',q

                    // url: this.props.model.ListUrl,
                    adaptor: new RemoteSaveAdaptor(),
                    // url : "api/product",
                    updateUrl: Urls.Issue.Edit,
                    removeUrl: Urls.Issue.Delete,
                    batchUrl: Urls.Issue.Batch,
                    // batchUrl : this.props.model.BatchUrl,
                    // offline: true,
                    json: result,
                    headers :[{...authentication()}],



                });
            setDatasource(data);
            
            setIssues(values);
        }
        )

    }, [])




    return (
        <DataTable 
        
        // dialogTemplate ={(props)=><IssueDetail  {...props}/>}
        edit
        data={dataSource} delete columns={columns} />

        // <GridComponent enableRtl={true} dataSource={dataSource} allowSorting={true}>
        //     <ColumnsDirective>
        //         {
        //             columns.map(c => {

        //                 return (
        //                     <ColumnDirective key={c.Name} field={c.Name} headerText={c.DisplayName} width='130'></ColumnDirective>

        //                 )
        //             })
        //         }
        //     </ColumnsDirective>


        // </GridComponent>
    )

}


