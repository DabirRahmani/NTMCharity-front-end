import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequest =({donatemount})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/DonateMoney', {amount:donatemount})
}

export default GDonateRequest