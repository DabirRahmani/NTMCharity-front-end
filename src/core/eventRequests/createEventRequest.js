import axios from "axios";
import BackendUrl from '../backendUrl'

const CreateEventRequest =({token,title,description,listofneeds,imageurl,moneytarget})=> 
{
    console.log(imageurl)
    return axios.create({baseURL: BackendUrl()})
    .post( '/CreateEvent',
    {
        TOKEN_ID:token,
        title:title,
        description:description,
        list_of_needs:listofneeds,
        image_url:imageurl,
        money_target:moneytarget
    })
}

export default CreateEventRequest