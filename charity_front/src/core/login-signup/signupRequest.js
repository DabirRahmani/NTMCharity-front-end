import axios from "axios";

const SignUpRequest =({username, password, email})=> 
{
     // return axios.post("http://127.0.0.1:8000/App1/signup", {username, password, email})
     
      return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/signup', {username: username, password: password, email:email})

}

export default SignUpRequest;