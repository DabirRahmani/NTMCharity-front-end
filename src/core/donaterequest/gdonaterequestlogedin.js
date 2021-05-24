import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequestLogedin =({unknown,donatemount})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/DonateMoney', {Unknown:unknown, amount:donatemount})
}

export default GDonateRequestLogedin