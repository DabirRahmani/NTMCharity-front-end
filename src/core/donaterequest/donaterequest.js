import axios from 'axios';


//token
//donatemount
//id
const DonateRequest =({id, token, donatemount})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/DonateMoney', {event_id:id,
     TOKEN_ID:token , amount:donatemount})
}

export default DonateRequest