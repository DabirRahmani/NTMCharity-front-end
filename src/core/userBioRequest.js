import axios from "axios";

const UserBioRequest =({username})=> 
{
    return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/UserBio', {username:username})
}

export default UserBioRequest