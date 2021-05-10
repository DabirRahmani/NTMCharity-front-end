import axios from "axios";

const VerifyEmailRequest =({email, code})=> 
{
     // return axios.post("http://127.0.0.1:8000/App1/signup", {username, password, email, type})
     
      return axios.create({baseURL: BackendUrl()+"/0xAjE2MT6eiOi538574I1NiJ467f4378A9iOiJ821A5IiLC695e6b88FFxkZ1a997F"}).post( '/VerifyEmail', {email:email , code:code})
      
}

export default VerifyEmailRequest;