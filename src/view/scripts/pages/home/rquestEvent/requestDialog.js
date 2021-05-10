import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React ,{ Component, useState , useEffect, useRef} from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import RequestForm from './requestForm'
import ReactDom from 'react-dom';
import Divider from '@material-ui/core/Divider';
import RequestedList from './requestedList'
import GetRequestedEvents from '../../../../../core/eventRequests/getRequestedEvents'
import DeleteRequestedEvent from '../../../../../core/eventRequests/deleteRequestedEvent'


const RequestEventDialog =(probs)=>
{
    const [reload, setReload] = useState(0);
    const [formTite, setFormTitle]= useState("");
    const [formDescription, setFormDescription]= useState("");
    const [formStatus, setFormStatus]= useState("false");//ترو برای حالت ادیت هست
    const [formEventId, setFormEventId]= useState("0");
    const [formListOfNeeds, setFormListOfNeeds]= useState([]);
    const [formMoneyTarget, setFormMoneyTarget]= useState("");

    //این ارایه باید همه چیزا رو داشته باشه ایدی استاتوس لیست مواد توضیحات و همه چیز مربوط به ایونت
    const [requestList, setRequestList]= useState([])


    useEffect(()=>
    {
        //اطلاعات مورد نیاز برای ریکوئست لیست اینجا باید اپدیت بشن
        GetRequestedEvents({token:localStorage.getItem("token")})
        .then((res)=>{
            let arr = Object.values(res.data.event_set)
            setRequestList(arr)
        })
    },[reload])



    const resetStates =()=>{
        //اینجا استیت هایی که برای فرم رکوئست داریم باید ریست بشن تا فرم رکوئست کاملا خالی بشه
        setFormTitle("");
        setFormDescription("");
        if(formEventId === "0")
        {
            setFormEventId("-1");
        }else 
        {
            setFormEventId("0");
        }
        setFormListOfNeeds([]);
        setFormStatus("false");
        setFormMoneyTarget("")
        setReload(reload+1);
    }


    const createFormRequest =()=>{
        return <RequestForm 
        canceledit={resetStates} 
        listofneeds={formListOfNeeds} 
        key={formEventId} 
        id={formEventId} 
        description={formDescription} 
        title={formTite} 
        status={formStatus} 
        eventId={formEventId} 
        moneytarget={formMoneyTarget}/>
    }

    const createRequestedList=()=>{

        return <RequestedList 
        key="rquestedlist" 
        id="requestedlist" 
        listofrequests={requestList} 
        ondelete={deleteRequestedItem} 
        onedit={editRequestedItem}/>
    }

    const deleteRequestedItem=(eventid)=>
    {
        DeleteRequestedEvent({token:localStorage.getItem("token"),eventid:eventid})
        .then((res)=>{
            setRequestList(requestList.filter(e=> e.id !== eventid))
        })
        
    }

    const editRequestedItem =(eventid)=>{
        let item = requestList.find(e=> e.id === eventid)
        setFormDescription(item.description)
        setFormTitle(item.title);
        setFormListOfNeeds(Object.values(item.list_of_needs))
        setFormEventId("0")
        setFormEventId(eventid);
        setFormStatus("true")
        setFormMoneyTarget(item.money_target)
        setReload(reload+1)
    }

    return <div>
        <Dialog maxWidth="md" fullWidth style={{backgroundColor: 'transparent'}} open={true}>

        <Box display="flex"  >
          <Typography  display="block" color="inherit" noWrap  style={{flexGrow: 1}}/>
          <IconButton onClick={probs.closeDialog} display="block" position="end" color="primary" >
          <CloseIcon  style={{color:'#e53935'}}/>
          </IconButton>
        </Box>

        <Box style={{overflow:'auto'}}>

            {createFormRequest()}

            
            {createRequestedList()}

        </Box>


        </Dialog>
    </div>
}

export default RequestEventDialog;