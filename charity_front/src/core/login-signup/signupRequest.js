import axios from "axios";

const SignUpRequest =({username, password, email})=> 
{
      console.log(username)
      return axios.post("http://127.0.0.1:8000/App1/signup", {username, password, email})
}

export default SignUpRequest;