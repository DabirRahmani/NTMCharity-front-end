import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React ,{ Component, useState , useEffect, useRef} from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import ReactDom from 'react-dom';
import Divider from '@material-ui/core/Divider';
import RequestedList from './requestedList'
import GetRequestedNeeds from '../../../../../core/NeedReq/getNeedRequested'
import deleteNeedRequested from '../../../../../core/NeedReq/deleteNeedRequested'
import NeedForm from './NeedForm'


const NeedReqDialog =(probs)=>
{
    const [reload, setReload] = useState(0);
    const [formtitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription]= useState("");
    const [formStatus, setFormStatus]= useState("false");//ترو برای حالت ادیت هست
    const [formNeedReqId, setFormNeedReqId]= useState("0");

    //این ارایه باید همه چیزا رو داشته باشه ایدی استاتوس لیست مواد توضیحات و همه چیز مربوط به ایونت
    const [requestList, setRequestList]= useState([])


    useEffect(()=>
    {
        //اطلاعات مورد نیاز برای ریکوئست لیست اینجا باید اپدیت بشن
        GetRequestedNeeds({token:localStorage.getItem("token")})
        .then((res)=>{
            if(res.data.NeedReq_set === undefined)
            {
                setRequestList([])
            }
            else {
                let arr = Object.values(res.data.NeedReq_set)
                setRequestList(arr)
            }

        })
    },[reload])



    const resetStates =()=>{
        //اینجا استیت هایی که برای فرم رکوئست داریم باید ریست بشن تا فرم رکوئست کاملا خالی بشه
        setFormDescription("");
        if(formNeedReqId === "0")
        {
            setFormNeedReqId("-1");
        }else 
        {
            setFormNeedReqId("0");
        }
        setFormStatus("false");
        setReload(reload+1);
    }


    const createFormRequest =()=>{
        return <NeedForm 
        canceledit={resetStates}
        key={formNeedReqId} 
        id={formNeedReqId}
         title={formtitle}
        description={formDescription}
        status={formStatus} 
        eventId={formNeedReqId} />
    }

    const createRequestedList=()=>{

        return <RequestedList 
        key="rquestedlist" 
        id="requestedlist" 
        listofrequests={requestList} 
        ondelete={deleteRequestedItem} 
        onedit={editRequestedItem}/>
    }

    const deleteRequestedItem=(needreqid)=>
    {
        deleteNeedRequested({token:localStorage.getItem("token"),needreqid:needreqid})
        .then((res)=>{
            setRequestList(requestList.filter(e=> e.id !== needreqid))
        })
        
    }

    const editRequestedItem =(needreqid)=>{
        let item = requestList.find(e=> e.id === needreqid)
        setFormDescription(item.description)
        setFormNeedReqId("0")
        setFormNeedReqId(needreqid);
        setFormStatus("true")
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

export default NeedReqDialog;