import React, { useEffect, useState } from 'react';
import useGlobal from 'store';
import { InputRenderer } from 'infrastructure/FormMaker/InputRenderer';
import GridItem from 'components/Grid/GridItem';
import { PropType } from 'models/Types';
import { MainService } from 'services/MainService';
import { Urls } from 'infrastructure/Helper/urls';


const convertToInput = (prop) => {

    switch (prop.Type) {

        case 0:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, DisplayName: prop.Title, Hint: prop.Hint
            }
        case 1:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, Id: prop.Id, DisplayName: prop.Title, Hint: prop.Hint
            }
        case 2:
            return {
                Name: prop.Id, Required: true, Type: PropType.Select, DataSource: prop.Source.split(',').map((s, i) => ({
                    text: s,
                    value: s
                })),
                Id: prop.Id, DisplayName: prop.Title
                , Hint: prop.Hint
            }

        case 4:
            return {
                Name: prop.Id, Required: true, Type: PropType.TextArea, Id: prop.Id, DisplayName: prop.Title, Hint: prop.Hint
            }

        default:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, Id: prop.Id, DisplayName: prop.Title, Hint: prop.Hint
            }
            break;
    }
}
export default function IssueDetail(props) {
    console.log('props: ', props);
    const currenValues = props.location.state;
    // const [state, actions] = useGlobal();
    const [values , setValues] = useState([]);
    const [message , setMessage] = useState([]);
    // const [issueType] = state.issueType;

    useEffect(() => {
        const typeId = props.match.params.typeId;
        const issueId = props.match.params.issueId
        MainService.Get(Urls.IssueType.Get + typeId).then((response => {
            console.log('response: ', response);
            setValues(response.Propertys);
        }))
        MainService.Get(Urls.Message.Get + issueId).then((response => {
            console.log('Message: ', response);
            setMessage(response);
        }))
    }, [])

   

    return (
            
                values.map(p => {
                    
                    return <GridItem xs={12} sm={12} md={12}>
                        <InputRenderer Disabled    {...convertToInput(p)}  DefaultValue={currenValues[p.Name]} />

                    </GridItem>
                })
            

        


    )

}