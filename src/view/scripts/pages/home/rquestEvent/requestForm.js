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
import CreateEventRequest from '../../../../../core/eventRequests/createEventRequest'
import EditRequestedEvent from '../../../../../core/eventRequests/editRequestedEvent'

const RequestForm =(probs)=>
{
    const [title, setTitle]= useState(probs.title)
    const [description, setDescription]= useState(probs.description)
    const [moneyTarget, setMoneyTarget]= useState("")
    const [listOfNeeds, setListOfNeeds]= useState(probs.listofneeds)
    const [newItem, setNewItem]= useState("")
    const [formStatus, setFormStatus] = useState(probs.status)//اگر فالس باشه یعنی فرم اصلی باشه
    //برای ساخت ایونت جدید
    //اگر ترو باشه یعنی میخوایم ایونت قدیمی رو تغییر بدیم
    const [eventId, setEventId] = useState(probs.eventId)

    const [itemListError,setItemListError] = useState("");

    const [formTitle, setFormTitle] = useState("Request new Event")

    const [submitButtonStatus, setSubmitButtonStatus] = useState(false);

    useEffect(()=>{
        if(formStatus === "true")
        {
            if(formTitle === "Request new Event")
            {
                setFormTitle("Edit Event number "+eventId)
            }
        } 
        else
        {
            formTitle.includes("Edit")
            {
                setFormTitle("Request new Event")
            }
        }
    })

    useEffect(()=>{
        if(!(/\S/.test(title)))
        {
            setSubmitButtonStatus(false)
        }else
        if(!(/\S/.test(description)))
        {
            setSubmitButtonStatus(false)
        }else
        if(!(/\S/.test(moneyTarget))){
            setSubmitButtonStatus(false)
        }else 
        {setSubmitButtonStatus(true)}
    },[title, description, moneyTarget])

    useEffect(()=>{if(probs.moneytarget !== undefined) setMoneyTarget(probs.moneytarget)},[])

    const ListOfNeedsRenderer=()=>
    {
        return listOfNeeds.map(e=> {if(e !== "") return <SingleItemList  key={e} value={e} deleteitem={deleteItemFromListOfNeeds} id={e}/>})
    }

    const deleteItemFromListOfNeeds=(res)=>{
        setListOfNeeds(listOfNeeds.filter(e=>e !== res))
    }

    const AddItemToListOfNeeds=(probs)=>
    {
        let item = probs.item.trim()
        if(!(/\S/.test(item)))
        {
          setItemListError("please write something")
        }
        else
        if(!listOfNeeds.includes(item))
        {
          setListOfNeeds([...listOfNeeds,item])
          setNewItem("")
          setItemListError("");
        }
        else
        {
          setItemListError("this item exists in list")
        }
    }

    const SubmitRequest =()=>{
        if(formStatus === "false")
        {
            CreateEventRequest({token:localStorage.getItem("token"),title:title,description:description,listofneeds:listOfNeeds, imageurl:"", moneytarget:moneyTarget})
            .then((res)=>{
                console.log(res)
            })
            .catch((res)=>{console.log(res)})
            .finally(()=>{cancelEdit();})
            cancelEdit();
        }
        else //باید ایونت قدیمی تغییر کنه
        {
            EditRequestedEvent({token:localStorage.getItem("token"),eventid:eventId,title:title,description:description,listofneeds:listOfNeeds, imageurl:"",moneytarget:moneyTarget})
            .then((res)=>{
                console.log(res)
            })
            .catch((res)=>{console.log(res)})
            .finally(()=>{cancelEdit();})
            cancelEdit();
        }
        setListOfNeeds(listOfNeeds.filter(e=> e === ""))

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
                style={{marginBottom:"-20px",background:"#ffc107", marginRight:"8px"}}
                onClick={cancelEdit}>
                    cancel
                </Button>

                <Button
                variant="contained"
                size="small" 
                disabled={!submitButtonStatus}

                color="primary"
                style={{marginBottom:"-20px",background:"#4caf50 "}}
                onClick={SubmitRequest}>
                    submit edit
                </Button>

            </div>
    
        }
        return <div 
        style={{display:"block",float: 'right',marginRight:"8px"}} >

            <Button
            variant="contained"
            size="small" 
            color="primary"
            disabled={!submitButtonStatus}
            style={{marginBottom:"-20px",background:"#4caf50 "}}
            onClick={SubmitRequest}>
                submit
            </Button>
        </div>
    }

    return <div>

        <div style={{margin:"24px",border:"solid", borderColor:"#000000", borderRadius:"5px", borderWidth:"1px"}}>
        <div style={{marginTop:"-22px", marginLeft:"16px",background:"#ffffff", display:"table", padding:"8px", fontSize:"24px"}}>
            <Typography>{formTitle}</Typography>
        </div>

        <div style={{display:"flex"}}>
        <TextField 
        style={{maxWidth:"40%",display: 'inline-block', marginLeft:"8px"}} 
        fullWidth 
        placeholder="please write a title" 
        label="title" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}/>

        <TextField 
        style={{maxWidth:"15%",display: 'inline-block', marginLeft:"40%"}} 
        fullWidth 
        label="$ requested" 
        type="number"
        value={moneyTarget} 
        onChange={(e)=>setMoneyTarget(e.target.value)}/>

        </div>

        <div style={{marginRight:"24px"}}>
        <TextField 
        style={{display: 'block', marginLeft:"8px"}} 
        multiline 
        fullWidth 
        placeholder="please write a description" 
        label="description" 
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        </div>

        <div style={{display: 'block', marginLeft:"8px"}}>
        <ListIcon style={{display: 'inline-block', marginTop:"12px",verticalAlign:"bottom"}}/>
        <Typography style={{display: 'inline-block'}} >List of needs</Typography>
        </div>

        <div style={{display: 'block', marginLeft:"8px"}}>

        {ListOfNeedsRenderer()}

        <IconButton 
        style={{display:"inline-block"}} 
        edge="start"
        onClick={()=>AddItemToListOfNeeds({item:newItem})}
        >
            <AddCircleIcon />
        </IconButton>

        <Input 
            placeholder="New Item" 
            style={{display:"inline-block"}}
            value={newItem}
            onChange={(e)=>{setNewItem(e.target.value)}}
        />
        <Typography style={{display:"inline-block", color:"#e53935"}}>{itemListError}</Typography>

        {submitText()}



        </div>
        </div>


    </div>
}

export default  RequestForm;