import axios from "axios";
import BackendUrl from '../backendUrl'

const GetNeedRequest =()=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/AllNeedRequestList',{"TOKEN_ID":localStorage.getItem("token")})
}

export default GetNeedRequest
