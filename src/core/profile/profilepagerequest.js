  
import axios from 'axios';

const ProfileRequest =({Username})=>
{
    return axios.create({baseURL: "http://127.0.0.1:1234/App1"}).post('/LoadUserProfile', {username:Username})
}

export default ProfileRequest