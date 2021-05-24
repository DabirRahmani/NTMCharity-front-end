import axios from "axios";
import BackendUrl from '../backendUrl'

const GetNotDeliveredProducts =()=> 
{
    return axios.create({baseURL: BackendUrl()}).post('/PendingDonate')
}

export default GetNotDeliveredProducts