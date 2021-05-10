import axios from "axios";

const ForgotPasswordRequest =({email})=> 
{
      return axios.create({baseURL: BackendUrl()}).post( '/ForgotPassword', {email:email})
}

export default ForgotPasswordRequest;