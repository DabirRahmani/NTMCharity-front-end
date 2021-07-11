import axios from "axios";
import BackendUrl from '../backendUrl'

const GetEvents =({key,number})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/Search',
    {
        search_key:key,
        page_number:number
    })
}

export default GetEvents