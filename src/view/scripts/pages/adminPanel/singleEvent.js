import React ,{ Component, useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Components } from 'antd/lib/date-picker/generatePicker';
import { styled } from '@material-ui/core/styles';
import { Feedback, Opacity } from '@material-ui/icons';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import SingleItemList from './singleItemList'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import UploadImage from '../../../../view/scripts/pages/uploadImage/UploadImage'
import UploadImageRequest from '../../../../core/uploadImage';
import BackendImageUrl from '../../../../core/BacknedImageUrl';





const SingleEvent = (probs)=> {




  
    const [feedback, setFeedback]= useState("");
    const [feedbackStatus, setFeedbackStatus]= useState(false);
    const [disableButtons, setDisableButtons]= useState(false);

    const [eventid, setEventId] = useState(probs.eventid)

    const [title, setTitle] = useState(probs.title)

    const [date, setDate] = useState(probs.date)

    const [description, setDescription] = useState(probs.description)

    const [username, setUsername]= useState(probs.username)

    const [listOfNeeds, setListOfNeeds] = useState("")

    const [moneyTarget, setMoneyTarget] = useState(probs.moneytarget)

    const [imageurl, setImageUrl] = useState(probs.imageurl)

    const [inDeleteOrConfirm, setInDeleteOrConfirm] = useState("none")

    const [inOnDelete, setInOnDelete] = useState("inherit")

    const [inOnConfirm, setInOnConfrim] = useState("inherit")

    const [inOnModify, setInOnModify] = useState("inherit")

    const [inModify, setInModify]= useState("none")

    const [inOnRequestEdit,setInOnRequestEdit]= useState("unherit")

    const [onCacellModify, setOnCacellModify] = useState("block")

    const [modifiedDescription, setModifiedDescription] = useState(probs.description)

    const [modifiedTitle, setModifiedTitle] = useState(probs.title)

    const [modifiedMoneyTarget,setModifiedMoneyTarget]= useState(probs.moneytarget)

    const [modifiedTitleStatus, setModifiedTitleStatus] = useState(false)

    const [modifiedDescriptionStatus, setModifiedDescriptionStatus] = useState(false)

    const [modifiedListOfNeeds, setModifiedListOfNeeds] = useState("")

    const [newListItem, setNewListItem] = useState("")

    const [newItemDisplay, setNewItemDisplay] = useState("none")

    const [newItemListError, setNewItemListError]= useState("")

    const [disableConfrimModifyButton,setDisableConfrimModifyButton] = useState(true)

    const [torenderUseEffect, setrenderer] = useState(true)

    const [submitImage, setsubmitImage] = useState(false)

    //prevent to get null object from list of needs
    useEffect(()=>{
      if(probs.listofneeds === null)
      {

      }
      else if(probs.listofneeds === undefined){

      } 
      else 
      {
        setListOfNeeds(Object.values(probs.listofneeds))
        setModifiedListOfNeeds(Object.values(probs.listofneeds))
      }
    },[torenderUseEffect])

    
      useEffect(()=>{
      if(/\S/.test(feedback))
      {
        setDisableButtons(false);
        setFeedbackStatus(false);
      }else if(inDeleteOrConfirm === "")
      {
        setFeedbackStatus(true)
        setDisableButtons(true)
      } else {setFeedbackStatus(true)}
      },[feedback])


      useEffect(()=>{
        if(newItemListError !== "")
        {
          setNewItemListError("")
        }
      },[newListItem])


      useEffect(()=>{
        if(/\S/.test(modifiedTitle))
        {
          setModifiedTitleStatus(false)
        }else
        {
          setModifiedTitleStatus(true)
        }

        if(/\S/.test(modifiedDescription))
        {
          setModifiedDescriptionStatus(false)
        }else
        {
          setModifiedDescriptionStatus(true)
        }

        if((/\S/.test(feedback)) && (/\S/.test(modifiedDescription)) && (/\S/.test(modifiedTitle)))
        {
          setDisableConfrimModifyButton(false)
        } else
        {
          setDisableConfrimModifyButton(true)
        }

        },[modifiedTitle,modifiedDescription,feedback])


      const onDeleteClicked =()=>{

        if(inDeleteOrConfirm === "none")
        {
          setInOnDelete("inherit")
          setInOnConfrim("none")
          setInOnModify("none")
          setInOnRequestEdit("none")
          setInDeleteOrConfirm("inherit")
          setFeedbackStatus(true)
          setDisableButtons(true)
        } else
        {
          probs.ondelete({eventid:eventid, feedback:feedback, username:username, title:title});
        }
     }
    
      const onConfirmClicked=()=>{
        if(inDeleteOrConfirm === "none")
        {
          setInOnDelete("none")
          setInOnConfrim("inherit")
          setInOnModify("none")
          setInOnRequestEdit("none")
          setInDeleteOrConfirm("inherit")
          setFeedbackStatus(true)
          setDisableButtons(true)
        } else
        {
          probs.onconfirm({eventid:eventid, feedback:feedback, username:username, title:title});
        }
      }


      const onRequestEditClicked=()=>{
        if(inDeleteOrConfirm === "none")
        {
          setInOnDelete("none")
          setInOnConfrim("none")
          setInOnModify("none")
          setInOnRequestEdit("inherit")
          setInDeleteOrConfirm("inherit")
          setFeedbackStatus(true)
          setDisableButtons(true)
        }else
        {
          probs.onedit({eventid:eventid, feedback:feedback, username:username, title:title});
          setFeedback("")
          setInOnDelete("inherit")
          setInOnConfrim("inherit")
          setInOnModify("inherit")
          setInOnRequestEdit("inherit")
          setInDeleteOrConfirm("none")
          setInModify("none")
          setFeedbackStatus(false)
          setDisableButtons(false)
  
          setOnCacellModify("block")
          setNewItemDisplay("none")

        }
      }

      const onCancelClicked=()=>{
        setFeedback("")
        setInOnDelete("inherit")
        setInOnConfrim("inherit")
        setInOnModify("inherit")
        setInOnRequestEdit("inherit")
        setInDeleteOrConfirm("none")
        setInModify("none")
        setFeedbackStatus(false)
        setDisableButtons(false)

        setOnCacellModify("block")
        setNewItemDisplay("none")
      }

      const onModifyClicked=()=>{
        setInOnDelete("none") //hide delete btn
        setInOnConfrim("none") //hide confrim btn
        setInOnModify("none") //hide modify btn
        setInOnRequestEdit("none")
        setInDeleteOrConfirm("inherit") //show feedback field
        setInModify("inherit") //show confrim modify bottun
        setFeedbackStatus(true)
        setDisableButtons(true)

        setOnCacellModify("none")
        setModifiedListOfNeeds(Object.values(probs.listofneeds))
        setModifiedTitle(probs.title)
        setModifiedDescription(probs.description)
        setNewItemDisplay("inline-block")
        setNewListItem("")
        setDisableConfrimModifyButton(true)
      }

      const onConfirmModifyClicked=()=>
      {
        setsubmitImage(true)
      }

    

    const imageDivider =()=>{
      if(/\S/.test(imageurl))
        return <Divider style={{margin:10, border:"1px solid", background:"#000", opacity:0.1}} orientation="vertical" flexItem />

    }
  
    const CreatelistOfNeeds=()=>
    {
      if((listOfNeeds.length > 0) && (onCacellModify !== "none"))
      {
        return listOfNeeds.map(e=> {if(e !== "") return <div  key={e} id={e}><LabelImportantIcon style={{display: "inline-block",color:"#000000" ,opacity: 0.5 ,fontSize:12}}/> <Typography style={{display: "inline-block",fontSize:12, color:"#000000" ,opacity: 0.5}}>{e}</Typography></div>} )
      }
      if(onCacellModify === "none")
      {
        return modifiedListOfNeeds.map(e=> {if(e !== "") return <SingleItemList  key={e} value={e} deleteitem={deleteItem} id={e}/>})
      }
      else
      {
        return <div><LabelImportantIcon style={{display: "inline-block",color:"#000000" ,opacity: 0.5 ,fontSize:12}}/> <Typography style={{display: "inline-block",fontSize:12, color:"#000000" ,opacity: 0.5}}>nothing listed</Typography></div>
      }
    }

    const deleteItem=(res)=>{
      setModifiedListOfNeeds(modifiedListOfNeeds.filter(e=> e !== res))
    }

    const AddItemToModifiedListOfNeeds=()=>{
      if(!(/\S/.test(newListItem)))
      {
        setNewItemListError("please write something")
      }
      else
      if(!modifiedListOfNeeds.includes(newListItem))
      {
        setModifiedListOfNeeds([...modifiedListOfNeeds,newListItem])
        setNewListItem("")
      }
      else
      {
        setNewItemListError("this item exists in list")
      }
    }


    const CreateImageView =()=>{

      if(inModify === "none")
      {
        if(imageurl === undefined || imageurl === null || imageurl === "")
        {
          return <div></div>
        }
        else
        return <img style={{maxWidth: "300px",maxHeight:"200px"}}  src={BackendImageUrl()+imageurl} />

      }
      

      return <UploadImage image={imageurl} onsubmit={submitImage} handleImage={handleImage}/>
    }

    const handleImage =(prob)=>
    {
      setsubmitImage(false)
      if(prob.changed === true)
      {
        UploadImageRequest(prob)
        .then(res=>{
            probs.onconfrimmodify({eventid:eventid, feedback:feedback,title:modifiedTitle, description:modifiedDescription, listofneeds:modifiedListOfNeeds,imageurl:res.data.image_url, username:username,moneytarget:modifiedMoneyTarget});

        })
      }
      else
      {
        probs.onconfrimmodify({eventid:eventid, feedback:feedback,title:modifiedTitle, description:modifiedDescription, listofneeds:modifiedListOfNeeds,imageurl:prob.src, username:username,moneytarget:modifiedMoneyTarget});
      }
    }



    return(

      <div id={eventid} key={eventid} style={{paddingBottom:16}}>
  
        <Accordion >
  
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
  
            <div style={{flexBasis: '33.33%',marginRight: '30px'}} >
              <Typography style={{fontSize:15, display:onCacellModify}} >{title}</Typography>
              <div style={{display: inModify, width:'100%'}}></div>
            </div>

            <div style={{flexBasis: '33.33%',marginRight: '30px'}} >
              <Typography style={{fontSize:15, display:onCacellModify}} >${moneyTarget}</Typography>
              <div style={{display: inModify, width:'100%'}}></div>
            </div>

            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5}} >#{eventid}</Typography>
            </div>
            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5}} >{username}</Typography>
            </div>
            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5}} >{date}</Typography>
            </div>
  
          </AccordionSummary>
  
          <AccordionDetails style={{alignItems: 'center'}}>
            <div style={{flex: '70%'}}  >
                <Typography  style={{ display: onCacellModify}}>
                  {description}
                </Typography>

                <TextField
                  label="$required"
                  rowsMax={1}
                  fullWidth
                  placeholder="$required"
                  style={{display: inModify, width:'20%'}}
                  value={modifiedMoneyTarget}
                  onChange={(e)=>setModifiedMoneyTarget(e.target.value)}
                  type="number"
                />

                <TextField
                  label="New Title"
                  rowsMax={1}
                  fullWidth
                  placeholder="please write a title"
                  style={{display: inModify, maxWidth:'40%'}}
                  value={modifiedTitle}
                  error={modifiedTitleStatus}
                  onChange={(e)=>setModifiedTitle(e.target.value)}
                />

                <TextField
                  label="New Description"
                  multiline
                  error={modifiedDescriptionStatus}
                  rowsMax={4}
                  fullWidth
                  placeholder="please write a description"
                  style={{display: inModify, width:'100%', marginTop:'16px', marginBottom:'24px'}}
                  value={modifiedDescription}
                  onChange={(e)=>setModifiedDescription(e.target.value)}
                />



              {CreatelistOfNeeds()}

              <IconButton style={{display: newItemDisplay}} edge="start" onClick={AddItemToModifiedListOfNeeds}>
                <AddCircleIcon />
              </IconButton>

              <Input 
              placeholder="New Item" 
              onChange={(e)=>setNewListItem(e.target.value)}
              value={newListItem}
              style={{display: newItemDisplay}}
              />

              <Typography style={{display: newItemDisplay, color:"#f44336", paddingLeft:"8px"}}>
              {newItemListError}
              </Typography>



            </div>
  
            {imageDivider()}


            <div style={{alignItems: 'center'}} >

              {CreateImageView()}
    
              </div>
  
  
          </AccordionDetails>
          
          <Divider />
  
          <AccordionActions>

            <TextField
              onChange={(e)=>setFeedback(e.target.value)}
              value={feedback} 
              placeholder="please write a feedback"
              fullWidth
              style= {{ paddingRight:16,paddingLeft:16, display: inDeleteOrConfirm}}
              error={feedbackStatus}
            />


            <Button
             variant="contained"
             color="primary"
             size="small"
             variant="contained"
             style= {{paddingRight:16,paddingLeft:16, display:inDeleteOrConfirm,backgroundColor:"#93aa2a"}}
             startIcon={<CancelIcon/>}
             onClick={onCancelClicked}
             >
              Cancel
            </Button>
            
            <Button
             variant="contained"
             color="primary"
             disabled={disableButtons}
             size="small"
             variant="contained"
             style= {{paddingRight:16,paddingLeft:16,minWidth:"150px", display:inOnRequestEdit, backgroundColor:"#ffc107"}}
             onClick={onRequestEditClicked}
             >
              Request Edit
            </Button>
  
            <Button
             variant="contained"
             color="primary"
             size="small"
             variant="contained"
             style= {{paddingRight:16,paddingLeft:16,display: inOnModify,backgroundColor:"#794949"}}
             startIcon={<CreateIcon/>}
             onClick={onModifyClicked}
             >
              Modify And confirm
            </Button>

            <Button
            disabled={disableConfrimModifyButton}
            onClick={onConfirmModifyClicked}
            variant="contained"
            color="primary"
            size="small"
            style= {{backgroundColor: "#794949",paddingRight:24,paddingLeft:24,display: inModify, whiteSpace: "nowrap", textAlign: "center"}}
            startIcon={<CheckCircleOutlineIcon />}>
              Confrim
            </Button>    


            <Button
            disabled={disableButtons}
            onClick={onDeleteClicked}
            variant="contained"
            color="primary"
            size="small"
            style= {{backgroundColor: "#e53935", paddingRight:16,paddingLeft:16,display: inOnDelete}}
            startIcon={<DeleteIcon />}>
              Delete
            </Button>          
  
            <Button
            disabled={disableButtons}
            onClick={onConfirmClicked}
            variant="contained"
            color="primary"
            size="small"
            style= {{backgroundColor: "#794949",paddingRight:16,paddingLeft:16,display: inOnConfirm}}
            startIcon={<CheckCircleOutlineIcon />}>
              Confirm
            </Button>    


          </AccordionActions>
  
        </Accordion>
  
      </div>
  
    );
  }
  
  export default SingleEvent;