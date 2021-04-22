import axios from "axios";

const SignUpRequest =({username, password, email, type})=> 
{
     // return axios.post("http://127.0.0.1:8000/App1/signup", {username, password, email, type})
     
      return axios.create({baseURL: "http://127.0.0.1:1234  /App1"}).post( '/signup', {username: username, password: password, email:email , type:type})

}

export default SignUpRequest;