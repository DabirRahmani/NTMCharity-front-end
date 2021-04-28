import axios from "axios";

const ChangePasswordRequest =({pass1,email,code})=> 
{
      return axios.create({baseURL: "http://127.0.0.1:8000/App1/0xAjE2MT6eiOi538574I1NiJ467f4378A9iOiJ821A5IiLC695e6b88FFxkZ1a997F"}).post( '/ResetPassword', {email:email,pass1:pass1,pass2:pass1,code})
}

export default ChangePasswordRequest;