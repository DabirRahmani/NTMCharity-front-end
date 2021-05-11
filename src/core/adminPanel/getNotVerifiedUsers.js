import axios from "axios";
import BackendUrl from '../backendUrl'

const GetNotVerifiedUsers =({admintoken})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/NotVerifiedUserSet', {TOKEN_API:admintoken})
}

export default GetNotVerifiedUsers