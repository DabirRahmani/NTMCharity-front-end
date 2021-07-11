import { Button, TextField, Input } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React ,{ Component, useState , useEffect} from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SingleItemList from '../../adminPanel/singleItemList'
import editNeedRequested from '../../../../../core/NeedReq/editNeedRequested'
import CreateNeedRequest from '../../../../../core/NeedReq/createNeedRequest'

const NeedForm =(probs)=>
{
    const [title, setTitle]= useState("")
    const [description, setDescription]= useState(probs.description)
    const [newItem, setNewItem]= useState("")
    const [formStatus, setFormStatus] = useState(probs.status)//اگر فالس باشه یعنی فرم اصلی باشه
    //برای ساخت ایونت جدید
    //اگر ترو باشه یعنی میخوایم ایونت قدیمی رو تغییر بدیم
    const [NeedReqId, setNeedReqId] = useState(probs.NeedReqId)

    const [itemListError,setItemListError] = useState("");

    const [formTitle, setFormTitle] = useState("Request What you need!")

    const [submitButtonStatus, setSubmitButtonStatus] = useState(false);

    useEffect(()=>{
        
        if(!(/\S/.test(title)))
        {
            setSubmitButtonStatus(false)
        }else
        if(!(/\S/.test(description)))
        {
            setSubmitButtonStatus(false)
        }
        {setSubmitButtonStatus(true)}
    },[title, description])

    const SubmitRequest =()=>
    {
        CreateNeedRequest({token:localStorage.getItem("token"),title:title,description:description})
        .then((res)=>{
            if(res.data.success === "1")
            {
                probs.success();
            }
        })
        .finally(()=>{})
        cancelEdit();

    }

    const cancelEdit =()=>{
        probs.canceledit();
    }

    const submitText =()=>{
        if(formStatus === "true")
        {
            return <div 
            style={{display:"block",float: 'right',marginRight:"8px"}} >

                <Button
                variant="contained"
                size="small" 
                color="primary"
                style={{marginBottom:"-20px",backgroundColor:"#93aa2a", marginRight:"8px",fontFamily:"Orelega One"}}
                onClick={cancelEdit}>
                    cancel
                </Button>

                <Button
                variant="contained"
                size="small" 
                disabled={!submitButtonStatus}

                color="primary"
                style={{marginBottom:"-20px",background:"#794949 ",fontFamily:"Orelega One"}}
                onClick={SubmitRequest}>
                    submit edit
                </Button>

            </div>
    
        }
        return <div 
        style={{display:"block",float: 'right',marginRight:"8px", marginTop: '2%'}} >

            <Button
            variant="contained"
            size="small"
            disabled={!submitButtonStatus}
            style={{marginBottom:"-20px",backgroundColor:"#794949",fontFamily:"Orelega One"}}
            onClick={SubmitRequest}>
                submit
            </Button>
        </div>
    }

    return <div>

        <div style={{margin:"24px",border:"solid", borderColor:"#000000", borderRadius:"5px", borderWidth:"1px" , height: '28vh'}}>
        <div style={{marginTop:"-22px", marginLeft:"16px",background:"#ffffff", display:"table", padding:"8px", fontSize:"24px"}}>
            <Typography style={{fontFamily:"Mate SC"}}>{formTitle}</Typography>
        </div>

        <div style={{display:"flex"}}>
        <TextField 
        style={{maxWidth:"97%",display: 'inline-block', marginLeft:"8px",fontFamily:"Mate SC"}} 
        fullWidth 
        placeholder="please write a title" 
        label="title" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}/>
        </div>

        <div style={{marginRight:"24px"}}>
        <TextField 
        style={{display: 'block', marginLeft:"8px",fontFamily:"Mate SC"}} 
        multiline 
        fullWidth 
        placeholder="please write a description" 
        label="description" 
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        </div>

        
        {submitText()}



        </div>
        </div>
}

export default  NeedForm;