import axios from "axios";

const ForgotPasswordRequest =({email})=> 
{
      return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/ForgotPassword', {email:email})
}

export default ForgotPasswordRequest;