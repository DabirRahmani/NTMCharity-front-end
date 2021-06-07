import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequestLogedin =({donatemount})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {money_amount:donatemount})
}

export default GDonateRequestLogedin