import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequest =({donatemount})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {money_amount:donatemount ,
    known:0})
}

export default GDonateRequest