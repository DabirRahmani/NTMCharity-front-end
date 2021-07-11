import axios from "axios";
import BackendUrl from '../backendUrl'

const ForgotPasswordRequest =({email})=> 
{
      return axios.create({baseURL: BackendUrl()}).post( '/ForgotPassword', {email:email})
}

export default ForgotPasswordRequest;