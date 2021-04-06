import axios from "axios";

const LoginRequest =({username, password})=> 
{
      return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/login', {username: username, password: password})
}

export default LoginRequest;