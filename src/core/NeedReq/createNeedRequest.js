import axios from "axios";
import BackendUrl from '../backendUrl'

const CreateNeedRequest =({token,title,description})=> 
{
    return axios.create({baseURL: BackendUrl()})
    .post( '/CreateNeedReq',
    {
        TOKEN_ID:token,
        title:title,
        description:description,

    })
}

export default CreateNeedRequest