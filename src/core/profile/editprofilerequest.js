import axios from 'axios';
import BackendUrl from '../backendUrl'

const EditProfileRequest =({usernamee, firstname , lastname ,usertype, codemelli , job, address
    , mobilenumber , housephone ,  workplacephone, gender , married})=>
{
    return axios.create({baseURL: BackendUrl()}).post('/SubmitUserProfile', {username:usernamee 
    , first_name:firstname , last_name:lastname , user_type:localStorage.getItem("user_type") 
    ,melli_code:codemelli , job:job, address:address
    , mobile_number:mobilenumber , house_phone:housephone ,  workplace_phone:workplacephone,
     gender:gender , married:married})
}

export default EditProfileRequest