import axios from "axios";
import BackendUrl from '../backendUrl'

const EditRequestedEvent =({token,eventid,title,description,listofneeds,imageurl,moneytarget})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/EditEventByUser',
    {
        TOKEN_ID:token,
        event_id:eventid,
        title:title,
        description:description,
        list_of_needs:listofneeds,
        image_url:imageurl,
        money_target:moneytarget
    })
}

export default EditRequestedEvent