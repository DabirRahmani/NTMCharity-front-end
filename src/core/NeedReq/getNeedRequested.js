import axios from "axios";
import BackendUrl from '../backendUrl'

const GetNeedRequested =({token})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/UserNeedReq',
    {
        token:token
    })
}

export default GetNeedRequested