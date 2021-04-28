import axios from "axios";

const PostEmailRequest =(probs)=> 
{
    const message= probs.message;
    const subject= probs.subject;
    const to_list=probs.email;
    const separated_with= ""

    return axios.create({baseURL: "http://127.0.0.1:8000/App1/SendEmail"}).post( "", {message, subject, to_list,separated_with})
}

export default PostEmailRequest