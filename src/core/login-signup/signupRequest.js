import axios from "axios";

const SignUpRequest =({username, password, email, type})=> 
{
     // return axios.post("http://127.0.0.1:8000/App1/signup", {username, password, email, type})
     
      return axios.create({baseURL: BackendUrl()}).post( '/signup', {username: username, password: password, email:email , user_type:type})

}

export default SignUpRequest;