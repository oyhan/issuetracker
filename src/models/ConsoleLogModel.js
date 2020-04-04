import React from "react"
import { PropType } from "./Types";
import { BaseModel } from "./BaseModel";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { resolve } from "url";
import { Urls } from "infrastructure/Helper/urls";
import { MainService } from "services/MainService";
import { URL } from "infrastructure/Helper/UrlHelper";
import ModelResources from "infrastructure/Resources/ModelResources";
import { formExtractor } from "infrastructure/Helper/formExtracor";
import AppConfiguration from "app.config";

var host = AppConfiguration.Server.Socket();
export class ConsoleLogModel extends BaseModel {

    static get Title() {
        return ModelResources.ConsoleLog.Title
    }

    static get Icon() {
        return <OpenInNewIcon />;
    }

    static get ListUrl(){
        return host + Urls.ConsoleLog.GetAll
    } 
    static get DeleteUrl(){
        return host + Urls.ConsoleLog.Delete
    } 
    
    static get EditUrl(){
        return host + Urls.ConsoleLog.Edit
    } 
    static get BatchUrl(){
        return host + Urls.ConsoleLog.Batch
    } 
    
    static list(){
        return MainService.GetAll(host + Urls.ConsoleLog.GetModel).then((response)=>{
            return response;
        });
    }
    static  get  properties() {

        
      
       return MainService.GetModel(host + Urls.ConsoleLog.GetModel);
      
        return [
            
            { Name: "name", Type: PropType.Text, DisplayName: "نام مرز" ,Required :true , value :"مقدار"},
            ...super.properties,

        ];
    }

    static list(){
        return MainService.GetAll(this.ListUrl).then((response)=>{
            console.log("reponse from get all");
            console.log(response);
            return response;
        });
    }


    static handleSubmit(event) {
        event.preventDefault();
        // let { from } = this.props.location.state || { from: { pathname: "/" } };

        var postdata = formExtractor(event.target);
        // postdata = JSON.parse(postdata);
        console.log(postdata);

        //if (postdata["Username"] === "ali" && postdata["Password"] === '123') {
            //console.log("ok");
             //UserService.singin({Name:"admin",isAuthenticated :true});
        return MainService.New(postdata)
            .then((response) => {
                console.log("response");
                console.log(response);

                // UserService.singin(response);
                return Promise.resolve({ redirect: "/ConsoleLog/list", message: "عملیات  با موفقیت انجام شد" });
            }, (error) => Promise.reject(error))



        return Promise.resolve({ message: 'admin loged in !', redirect: "/" })

    }
    

       
        // return Promise.reject("error")
        
}
