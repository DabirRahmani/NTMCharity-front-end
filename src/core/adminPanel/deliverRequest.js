import axios from 'axios';
import BackendUrl from '../backendUrl'

const DeliverRequest =({id, token})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/Delivery', {donate_id:id,
     TOKEN_ID:token})
}

export default DeliverRequest