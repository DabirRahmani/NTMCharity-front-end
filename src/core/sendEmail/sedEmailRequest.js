import axios from "axios";
import BackendUrl from '../backendUrl'

const PostEmailRequest =(probs)=> 
{
    const message= probs.message;
    const subject= probs.subject;
    const to_list=probs.email;
    const separated_with= ""

    return axios.create({baseURL: BackendUrl()}).post( "/SendEmail", {message, subject, to_list,separated_with})
}

export default PostEmailRequest