import React, { useState } from 'react';
import { PropType } from "models/Types"
import GridItem from 'components/Grid/GridItem';
import { InputRenderer } from 'infrastructure/FormMaker/InputRenderer';
import { Paper, IconButton, makeStyles, FormControl } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import useGlobal from 'store';
import { Close, Edit, Check } from '@material-ui/icons';

const useStyle = makeStyles((theme) => {
    return {
        removeBtn: {

        },
        actionButtons: {

            display: 'inline-block',
            marginTop: '-6px'
        }
    }

})

export default function PropertyItem({ index , handleRemove ,...props}) {
    

    const [attributes, removeAttribute] = useGlobal(
        state => state.attributes,
        actions => actions.removeAttribute
    );

    const [editMode, setEditMode] = useState(!props.readonly)
    var classes = useStyle();
    const typeDataSource = [
        { text: 'String', value: 0 },
        { text: 'Number', value: 1 },
        { text: 'MultiValue', value: 2 },
        { text: 'OutSource', value: 3 },
        { text: 'TextArea', value: 4 },
        { text: 'Date', value: 5 },
    ]

    const fields = [
        { Name: "Title",DisplayName : "Title"  ,Required: true, Type: PropType.Text, DefaultValue: props.item && props.item.Title, Disabled: !editMode },
        { Name: "Type", DisplayName :"Type", Required: true, Type: PropType.Select, DataSource: typeDataSource, DefaultValue: props.item && props.item.Type, Disabled: !editMode, Controled: props.controled },
        { Name: "Source",DisplayName : "Source", Required: false, Type: PropType.Text, DefaultValue: props.item && props.item.Source, Disabled: !editMode },
        { Name: "Hint",DisplayName :  "Hint", Required: false, Type: PropType.Text, DefaultValue: props.item && props.item.Hint, Disabled: !editMode },
        { Name: "Name", DisplayName :  "Name",Required: true, Type: PropType.Text, DefaultValue: props.item && props.item.Name, Disabled: !editMode },
        { Name: "OutSourceJsonKey",DisplayName : "OutSourceJsonKey", Required: false, Type: PropType.Text, DefaultValue: props.item && props.item.OutSourceJsonKey, Disabled: !editMode },
        { Name: "OutSourceJsonValue", DisplayName : "OutSourceJsonValue",Required: false, Type: PropType.Text, DefaultValue: props.item && props.item.OutSourceJsonValue, Disabled: !editMode },
        { Name: "Id", Required: false,  Type: PropType.Hidden, DefaultValue: props.item && props.item.Id, Disabled: !editMode },



    ]
    const removeProperty = (e) => {
        handleRemove(index)
        removeAttribute(props.item);
    }
    return (
        // <Paper >
        <GridItem xs={12} sm={12} md={12}>
            {
                fields.map((f,i) => {
                    // 
                    if (!editMode  && !props.item[f.Name] && props.item[f.Name]!==0) return "";



                    return <InputRenderer key={i} {...f} Name={`dto.Propertys[${index}].${f.Name}`}  onChange={props.handleChange}  />
                }



                )
            }
            {
                props.readonly ?
                    <div className={classes.actionButtons}>
                        <FormControl margin='normal'>
                            <IconButton onClick={removeProperty} className={classes.removeBtn} color="secondary" aria-label="add an alarm">
                                <Close />
                            </IconButton>
                        </FormControl>
                        {
                            editMode ?
                                <FormControl margin='normal'>
                                    <IconButton onClick={() => setEditMode(false)}  className={classes.removeBtn} color="secondary" aria-label="add an alarm">
                                        <Check />
                                    </IconButton>
                                </FormControl> :
                                <FormControl margin='normal'>
                                    <IconButton onClick={() => setEditMode(true)} className={classes.removeBtn} color="secondary" aria-label="add an alarm">
                                        <Edit />
                                    </IconButton>
                                </FormControl>
                        }

                    </div>

                    : null
            }

        </GridItem>
        // </Paper>

    )

}