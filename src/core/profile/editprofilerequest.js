import axios from 'axios';

const EditProfileRequest =({usernamee, firstname , lastname ,usertype, codemelli , job, address
    , mobilenumber , housephone ,  workplacephone, gender , married})=>
{
    return axios.create({baseURL: "http://127.0.0.1:1234/App1"}).post('/SubmitUserProfile', {username:usernamee 
    , first_name:firstname , last_name:lastname , user_type:localStorage.getItem("user_type") 
    ,melli_code:codemelli , job:job, address:address
    , mobile_number:mobilenumber , house_phone:housephone ,  workplace_phone:workplacephone,
     gender:gender , married:married})
}

export default EditProfileRequest