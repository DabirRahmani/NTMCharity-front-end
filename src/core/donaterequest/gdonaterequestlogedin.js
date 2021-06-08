import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequestLogedin =({donatemount , state})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {money_amount:donatemount 
        , known:state})
}

export default GDonateRequestLogedin