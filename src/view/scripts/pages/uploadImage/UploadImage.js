import { Dialog, IconButton } from "@material-ui/core"
import axios from "axios";
import { useState } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const UploadImage=(probs)=>
{
    

    const [state, setState] = useState(null)

    const [src, setSrc] = useState(probs.image)

    const [showImage, setShowImage] = useState(null)

    const [change, setChange] = useState(false)
    
    const handleImageChange = (e) => {
        e.preventDefault()
        setState({
          image: e.target.files[0]
        })

        let reader = new FileReader();


        reader.onload = (e) => {
          setShowImage({image: e.target.result});
        };
        reader.readAsDataURL(e.target.files[0]);

        setChange(true)

    };





    const cancelImage=(e)=>{
        e.preventDefault()
        setSrc("");
        setShowImage(null);
        setState(null);
        setChange(false)
    }

    if(probs.onsubmit === true)
    {
      probs.handleImage({src:src,state:state,changed:change})
    }


    if((src === undefined) || (src === ""))
      {
        if(showImage === null)
        {
          return <div style={{display: 'inline-block', marginRight:"8px"}} >
          <form >
            <div style={{display: 'inline-block'}}>No Image</div>
              <input type="file"
                     id="icon-button-file"
                     accept="image/png, image/jpeg" 
                     onChange={handleImageChange} 
                     required
                     style={{maxWidth:"80%",display:"none"}}
                     />

          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>

          </form>
          </div>
        }
        else
        {
          return <div style={{width:"200px",  maxHeight:"200px",minWidth:"200px", marginRight:"8px"}} >

            
            <IconButton onClick={cancelImage}  >
              <CancelIcon />
            </IconButton>

            <img 
                  src={showImage.image}
                  style={{width:"200px",  maxHeight:"200px",minWidth:"200px"}}
                  />

      
          </div>
        }


    }
    else
      {
        return <div style={{width:"200px",  maxHeight:"200px",minWidth:"200px", marginRight:"8px"}} >

          
        <IconButton onClick={cancelImage}  >
          <CancelIcon />
        </IconButton>
        <img 
              src={src}
              style={{width:"200px",  maxHeight:"200px",minWidth:"200px"}}
              />

  
      </div>
    }




    
}

export default UploadImage