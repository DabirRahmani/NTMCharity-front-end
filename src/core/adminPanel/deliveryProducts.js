import axios from "axios";
import BackendUrl from '../backendUrl'

const DeliveryProducts =({admintoken,id})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/Delivery', {TOKEN_API:admintoken, donate_id:id})
}

export default DeliveryProducts