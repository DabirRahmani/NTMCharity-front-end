import axios from "axios";
import BackendUrl from './backendUrl'

const UploadImageRequest =(probs)=> 
{
    var state = probs.state;

    let form_data = new FormData();
    form_data.append('image', state.image, state.image.name);


    return axios.create({baseURL: BackendUrl()})
    .post('/UploadImage',
     form_data,
      {
        headers: 
        {
          'content-type': 'multipart/form-data'
        }
    })
}

export default UploadImageRequest