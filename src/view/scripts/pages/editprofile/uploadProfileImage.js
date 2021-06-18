import { Dialog, IconButton } from "@material-ui/core"
import axios from "axios";
import { useEffect, useState } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import BackendImageUrl from "../../../../core/BacknedImageUrl";

const UploadProflieImage=(probs)=>
{
  
    

    const [state, setState] = useState(null)

    const [src, setSrc] = useState("")

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

    useEffect(()=>{
        setSrc(probs.image)
    },[probs])

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



      if((src === undefined) || (src === "") || (src === null))
      {
        if(showImage === null)
        {
          return <div >
            
          
          <form >
              <input type="file"
                     id="icon-button-file"
                     accept="image/png, image/jpeg" 
                     onChange={handleImageChange} 
                     required
                     style={{maxWidth:"80%",display:"none"}}
                     />

          <Avatar alt="Remy Sharp" src={src} style={{width:"200px", height:"200px"}} />

          <label htmlFor="icon-button-file">
            <IconButton style={{marginTop:"-60px", zIndex:"+1"}} color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>

          </form>
          </div>
        }
        else
        {
          return <div >

            <Avatar alt="Remy Sharp" src={showImage.image} style={{width:"200px", height:"200px"}} />

            <IconButton style={{marginTop:"-60px", zIndex:"+1"}} onClick={cancelImage}  >
              <CancelIcon />
            </IconButton>

      
          </div>
        }


      }
      else
      {
        return <div  >

        <Avatar alt="Remy Sharp" src={BackendImageUrl()+src} style={{width:"200px", height:"200px"}} />


        <IconButton style={{marginTop:"-60px", zIndex:"+1"}} onClick={cancelImage}  >
          <CancelIcon />
        </IconButton>


      </div>
      }




    
}

export default UploadProflieImage