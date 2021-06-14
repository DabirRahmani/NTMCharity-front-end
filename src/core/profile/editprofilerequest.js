import axios from 'axios';
import BackendUrl from '../backendUrl'

const EditProfileRequest =({usernamee, firstname , lastname ,usertype, codemelli 
     , gender, src })=>
{

    return axios.create({baseURL: BackendUrl()}).post('/SubmitUserProfile', {username:usernamee 
    , first_name:firstname , last_name:lastname , user_type:localStorage.getItem("user_type") 
    ,melli_code:codemelli 
    , mobile_number:"",image_url:src,
     gender:gender})
}

export default EditProfileRequest