import axios from "axios";
import BackendUrl from '../backendUrl'

const GetRequestedEvents =({token})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/UserEvent',
    {
        token:token
    })
}

export default GetRequestedEvents