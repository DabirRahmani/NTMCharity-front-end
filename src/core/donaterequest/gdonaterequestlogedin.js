import axios from 'axios';
import BackendUrl from '../backendUrl'

const GDonateRequestLogedin =({donatemount , state,token})=>
{
    if(state === false)
    {
        return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {money_amount:donatemount 
            , known:1, TOKEN_ID:token})
    }
    return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {money_amount:donatemount 
        , known:state})
}

export default GDonateRequestLogedin