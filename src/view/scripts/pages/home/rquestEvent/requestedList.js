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
import SignleRequestListItem from './singleRequestItem'



const RequestedList =(probs)=>
{

    const createListOfRequestedItems =()=>{
        return probs.listofrequests
        .map(item=>
             {return <SignleRequestListItem 
                id={item.id} 
                key={item.id} 
                feedback={item.feedback} 
                title={item.title} 
                status={item.status} 
                ondelete={probs.ondelete} 
                onedit={probs.onedit}
                />})
    }

    return <div 
    style={{margin:"24px",marginTop:"48px",border:"solid", borderColor:"#000000", borderRadius:"5px", borderWidth:"1px", paddingBottom:"8px"}}>
        
        <div style={{marginTop:"-22px", marginLeft:"16px",background:"#ffffff", display:"table", padding:"8px", fontSize:"24px"}}>
            <Typography style={{fontFamily:"Sigmar One"}}>Your Requests</Typography>
        </div>

        <div>
            <Typography style={{width:"30%", display:"inline-block",paddingLeft:"8px", overflowWrap:"break-word",fontFamily:"Mate SC"}}>title</Typography>
            <Typography style={{width:"50%", display:"inline-block",paddingLeft:"8px", overflowWrap:"break-word",fontFamily:"Mate SC"}}>feedback</Typography>
            <Typography style={{display:"inline-block",paddingLeft:"8px", overflowWrap:"break-word",fontFamily:"Mate SC"}}>status</Typography>

        </div>

        {createListOfRequestedItems()}


    </div>
}

export default RequestedList;