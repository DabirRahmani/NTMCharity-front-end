import axios from "axios";
import BackendUrl from '../backendUrl'

const EditNeedRequested =({token,eventid,description})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/EditNeedReqByUser',
    {
        TOKEN_ID:token,
        event_id:eventid,
        description:description,
    })
}

export default EditNeedRequested