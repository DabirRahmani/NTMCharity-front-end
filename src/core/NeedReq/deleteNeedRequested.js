import axios from "axios";
import BackendUrl from '../backendUrl'

const DeleteNeedRequested=({token,eventid})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/DeleteNeedRequested',
    {
        token:token,
        event_id:eventid,

    })
}

export default DeleteNeedRequested