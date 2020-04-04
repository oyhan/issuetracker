
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { TextField, Button, Paper } from "@material-ui/core";
import CustomDropDownList from "components/Dropdown/Dropdownlist";
import { PropType } from "models/Types";
import { InputRenderer } from "infrastructure/FormMaker/InputRenderer";
import GridItem from "components/Grid/GridItem";
import { formObject } from "infrastructure/Helper/formExtracor";
import useGlobal from "store";
import PropertyItem from "./PropertyItem";







const IssueTypePropertyNew = forwardRef((props, ref) => {

    const [attributes, addAttribute] = useGlobal(
        state => state.attributes,
        actions => actions.addAttribute
    );

    // var [cols, setCols] = useState([]);


    useImperativeHandle(ref, (event) => ({

        handleSubmit
    }));





    const handleSubmit = (event) => {

        event.preventDefault();
        var form = document.getElementById("property-item");
        var postdata = formObject(form);
        const propItem= {
            
            Title : postdata['dto.Propertys[undefined].Title'],
            Type : postdata['dto.Propertys[undefined].Type'],
            Source : postdata['dto.Propertys[undefined].Source'],
            Hint : postdata['dto.Propertys[undefined].Hint'],
            Name : postdata['dto.Propertys[undefined].Name'],
            OutSourceJsonKey : postdata['dto.Propertys[undefined].OutSourceJsonKey'],
            OutSourceJsonValue : postdata['dto.Propertys[undefined].OutSourceJsonValue'],
        }
        
        props.handleAddItem &&  props.handleAddItem(propItem);

        addAttribute(propItem);
    }


    return (
        <form id='property-item' onSubmit={handleSubmit} >

            <Paper>
                <PropertyItem item={props.item} />
                <Button type="button" onClick={handleSubmit} color="primary">ثبت</Button>
            </Paper>


        </form>

    )
})

export default IssueTypePropertyNew;


