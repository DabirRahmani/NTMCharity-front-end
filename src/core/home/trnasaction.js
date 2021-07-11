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

const GetTopTransactions =(probs)=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/BiggestTransactionList',
    {
        count:probs.count
    })
}

export {GetTopTransactions,GetLastTransactions}