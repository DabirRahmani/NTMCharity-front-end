  
import axios from 'axios';
import BackendUrl from '../backendUrl'

const ProfileRequest =({Username})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/LoadUserProfile', {username:Username})
}

export default ProfileRequest