import axios from "axios";
import BackendUrl from "../../backendUrl";

const GetVerifiedDonatorSet =({admintoken})=> 
{
    return axios.create({baseURL: BackendUrl()}).post( '/VerifiedDonatorSet', {TOKEN_API:admintoken})
}

export default GetVerifiedDonatorSet