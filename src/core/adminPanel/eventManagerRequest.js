import axios from "axios";

const GetEventsRequests =({admintoken})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/GetEventRequested', {TOKEN_ID:admintoken})
}

const DeleteRequestedEvent =({admintoken, eventid,feedback})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/LeaveFeedback', {TOKEN_ID:admintoken,event_id:eventid,feedback:feedback,accept:"0"})
}

const ConfrimRequestedEvent =({admintoken, eventid, feedback})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/LeaveFeedback', {TOKEN_ID:admintoken,event_id:eventid,feedback:feedback,accept:"1"})
}

const ModifyRequestedEvent =({admintoken,eventid, title, description,listofneeds,imageurl,feedback })=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/EditEventByAdmin', {list_of_needs:listofneeds,TOKEN_ID:admintoken,event_id:eventid,feedback:feedback,title:title,description:description,image_url:imageurl})
}


export {ConfrimRequestedEvent,DeleteRequestedEvent,ModifyRequestedEvent,GetEventsRequests}