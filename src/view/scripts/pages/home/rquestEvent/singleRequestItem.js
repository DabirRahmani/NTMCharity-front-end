
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
import ListIcon from '@material-ui/icons/List';


//ورودی های این کامپوننت باید اطلاعات ایونت باشن. به علاوه ایدی ایونت
//و دو تا تابع که ان دلیت و ان ادیت هست
//این تابع ها باید اول پردازش بشن و به نسبت خودشون هر کدوم نیاز بود پاس داده بشن

const SignleRequestListItem =(probs)=>
{

    const onDelete =()=>{
        probs.ondelete(probs.id)
    }

    const onEdit =()=>{
        probs.onedit(probs.id)
    }

    //چهار تا استاتوس داریم یکی برای حالت رجکت شدن یکی برای اکسپت شدن
    //یکی برای فید بکی که هنوز داده نشده
    //یکی برای حالتی که فیدبک داده شده
    const createStatus =()=>{

        switch(probs.status)
        {

            case -1:{
                return <div 
                style={{verticalAlign:"middle",paddingLeft:"8px", display:"inline-block"}}>
                    <Typography 
                    style={{color:"#e53935",display:"inline-block",paddingLeft:"4px",verticalAlign:"top",fontFamily:"Mate SC"}}>
                        rejected
                    </Typography>
                </div>
            }

            case 1:{
                 return <div 
                style={{verticalAlign:"middle",paddingLeft:"8px", display:"inline-block"}}>
                    <Typography 
                        style={{color:"#4caf50",display:"inline-block",paddingLeft:"4px",verticalAlign:"top",fontFamily:"Mate SC"}}>
                        accepted
                    </Typography>
                </div>

            }

            case 0:{
                if((probs.feedback === null) || (probs.feedback === undefined) || (probs.feedback=== ""))
                {
                    return <div 
                    style={{verticalAlign:"middle",paddingLeft:"8px", display:"inline-block",fontFamily:"Orelega One"}}>
                        <Button
                        variant="contained"
                        size="small" 
                        color="primary"
                        style={{background:"#e53935"}}
                        onClick={onDelete}
                        >
                            delete
                        </Button>                    
                    </div>
                }
                else
                {
                    return <div 
                    style={{verticalAlign:"middle",paddingLeft:"8px", display:"inline-block",fontFamily:"Orelega One"}}>
                        <Button
                        variant="contained"
                        size="small" 
                        color="primary"
                        style={{background:"#ffc107"}}
                        onClick={onEdit}
                        >
                            Edit
                        </Button>
                    </div>
                }

            }

        }

    }
    
        return <div>
        <Divider light style={{margin:"8px"}}/>
        <div >

            <Typography 
            style={{verticalAlign:"middle",width:"30%", display:"inline-block",paddingLeft:"8px", overflowWrap:"break-word",fontFamily:"Mate SC"}}>
                {probs.title}
            </Typography>

            <Typography 
            style={{verticalAlign:"middle",width:"50%", display:"inline-block",paddingLeft:"8px", overflowWrap:"break-word",fontFamily:"Mate SC"}}>
                {probs.feedback}
            </Typography>

            {createStatus()}

        </div>
        </div>
}

export default SignleRequestListItem