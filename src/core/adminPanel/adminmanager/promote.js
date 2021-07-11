import axios from "axios";
import BackendUrl from "../../backendUrl";

const postPromote =({admintoken, user})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/PromoteToAdmin', {TOKEN_ID:admintoken, username:user})
}

export default postPromote