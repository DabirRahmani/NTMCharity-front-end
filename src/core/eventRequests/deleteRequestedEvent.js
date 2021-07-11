import axios from "axios";
import BackendUrl from '../backendUrl'

const DeleteRequestedEvent =({token,eventid})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/DeleteEvent',
    {
        token:token,
        event_id:eventid,

    })
}

export default DeleteRequestedEvent