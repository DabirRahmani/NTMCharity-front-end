import axios from "axios";

const LoginRequest =({username, password})=> 
{
      return axios.create({baseURL: BackendUrl()}).post( '/login', {username: username, password: password})
}

export default LoginRequest;