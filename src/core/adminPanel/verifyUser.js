import axios from "axios";
import BackendUrl from '../backendUrl'

const VerifyUser =({admintoken,id,action})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/VerifyOrRejectUser', {TOKEN_API:admintoken, user_id:id,action:action})
}

export default VerifyUser