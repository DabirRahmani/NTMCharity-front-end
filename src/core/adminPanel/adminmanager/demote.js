import axios from "axios";
import BackendUrl from "../../backendUrl";

const postDemote =({admintoken, user})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/DemoteAdmin', {TOKEN_ID:admintoken, username:user, user_type:"3"})
}

export default postDemote