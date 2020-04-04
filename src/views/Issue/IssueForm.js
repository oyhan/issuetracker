import React from 'react';
import useGlobal from 'store';
import { InputRenderer } from 'infrastructure/FormMaker/InputRenderer';
import GridItem from 'components/Grid/GridItem';
import { PropType } from 'models/Types';


const convertToInput = (prop) => {

    switch (prop.Type) {

        case 0:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, DisplayName: prop.Title, Hint : prop.Hint
            }
        case 1:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, Id: prop.Id, DisplayName: prop.Title , Hint : prop.Hint
            }
        case 2:
            return {
                Name: prop.Id, Required: true, Type: PropType.Select, DataSource: prop.Source.split(',').map((s, i) => ({
                    text: s,
                    value: s
                })),
                Id: prop.Id, DisplayName: prop.Title
                , Hint : prop.Hint
            }

            case 4:
                    return {
                        Name: prop.Id, Required: true, Type: PropType.TextArea, Id: prop.Id, DisplayName: prop.Title, Hint : prop.Hint
                    }
                
        default:
            return {
                Name: prop.Id, Required: true, Type: PropType.Text, Id: prop.Id, DisplayName: prop.Title, Hint : prop.Hint
            }
            break;
    }
}
export default function IssueForm() {

    const [state, actions] = useGlobal();

    const [issueType] = state.issueType;
    

    const props = issueType.Propertys;

    return (
        <form id="issueForm">
            {
                props.map(p => {

                    return <GridItem xs={12} sm={12} md={12}>
                        <InputRenderer globalState={actions.addState} {...convertToInput(p)} />

                    </GridItem>
                })
            }

        </form>


    )

}