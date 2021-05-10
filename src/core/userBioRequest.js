import axios from "axios";

const UserBioRequest =({username})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/UserBio', {username:username})
}

export default UserBioRequest