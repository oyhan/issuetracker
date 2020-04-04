import React from 'react'
import { Urls } from 'infrastructure/Helper/urls';
import { MainService } from 'services/MainService';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { authentication } from 'services/UserService';
import DataTable from 'views/Issue/ValueGrid';
import { useHistory, Switch, Route } from "react-router-dom";
import IssueDetail from 'views/Issue/IssueDetails';







export default function ClientIssues(props) {


    const history = useHistory();

    const issueDoubleClick = (args) => {
        console.log('args: ', args);
        const id = args.rowData.Id;
        props.match.params.data = args.rowData;

        history.push(`${props.match.url}/details/${id}`, args.rowData);
    }
    const gridConfig = {
        recordDoubleClick: issueDoubleClick
    }

   

    const typeId = props.match.params.typeId;
    const [, setIssues] = React.useState([]);
    const [dataSource, setDatasource] = React.useState([]);
    const [columns, setColumns] = React.useState([]);





    React.useEffect(() => {

        MainService.GetAll(Urls.Issue.ClientGetByTypeId + typeId).then(issues => {


            issues = issues.Issues;
            const cols = [];
            cols.push({ Name: "Id" })
            issues.length > 0 && issues[0].Type.Propertys.map(p => (
                cols.push({


                    Name: p.Name,
                    DisplayName: p.Title
                })));


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
                    headers: [{ ...authentication() }],



                });
            setDatasource(data);

            setIssues(values);
        }
        )

    }, [])




    return (
        <Switch>

            <Route path={`${props.match.path}/details/:issueId`} component={IssueDetail} />
            <DataTable
                gridConfig={gridConfig}
                
                data={dataSource}  columns={columns} />
        </Switch>



    )

}


