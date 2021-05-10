import axios from 'axios';


//token
//donatemount
//id
const DonateRequest =({id, token, donatemount})=>
{
    return axios.create({baseURL: "http://127.0.0.1:1234/App1"}).post('/DonateMoney', {event_id:id,
     TOKEN_ID:token , amount:donatemount})
}

export default DonateRequest