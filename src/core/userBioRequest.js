import axios from "axios";
import BackendUrl from './backendUrl'
const UserBioRequest =({username})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/UserBio', {username:username})
}

export default UserBioRequest