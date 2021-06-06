import axios from "axios";
import BackendUrl from "../../backendUrl";

const GetAdminSet =({admintoken})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/AdminSet', {TOKEN_API:admintoken})
}

export default GetAdminSet