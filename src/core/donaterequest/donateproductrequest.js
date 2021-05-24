import axios from 'axios';
import BackendUrl from '../backendUrl'

const DonateProducrRequest =({token , product, number})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/GeneralDonate', {
     TOKEN_ID:token ,product_id:product, quantity:number})
}

export default DonateProducrRequest