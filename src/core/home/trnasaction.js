import axios from "axios";
import BackendUrl from '../backendUrl'

const GetLastTransactions =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/RecentTransactionList',
    {
        count:probs.count
    })
}

export default GetLastTransactions