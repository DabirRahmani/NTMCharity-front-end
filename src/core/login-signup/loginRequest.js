import axios from "axios";
import BackendUrl from '../backendUrl'

const LoginRequest =({username, password})=> 
{
      return axios.create({baseURL: BackendUrl()}).post( '/login', {username: username, password: password})
}

export default LoginRequest;