import React, {useState,useEffect} from 'react'
import store from '../../../../core/adminPanel/store/eventManagerStore'
import SingleEvent from './singleEvent'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import PostEmailRequest from '../../../../core/sendEmail/sedEmailRequest';
import {ConfrimRequestedEvent,DeleteRequestedEvent,ModifyRequestedEvent,GetEventsRequests,EditRequestForRequestedEvent} from '../../../../core/adminPanel/eventManagerRequest'
import UserBioRequest from '../../../../core/userBioRequest'
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';






function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1);
}

const EventRequestRenderer =()=>
{



    const forceUpdate = useForceUpdate();

    const [dianogTitle, setDianogTitle] = React.useState("")
    const [dianogStatus, setDianogStatus] = React.useState(false)
    const [dianogStatusCode, setDianogStatusCode]= React.useState("")
    const [dianogLinearProgressStatus,setDianogLinearProgressStatus]= React.useState("block")

    const [networkError, setNetworkError] = React.useState(false)

    const [reload, setReload] = React.useState(0)

    const forceReload =()=>{
        setReload(reload=>reload+1)
    }


    //create store in each reload
    useEffect(()=>{
        store.dispatch({type: "RESET", payload:{}})

        GetEventsRequests({admintoken:localStorage.getItem("token")})
        .then((response)=>{

            setNetworkError(false);


            Object.values(response.data.event_set)
            .map(d=>
                store.dispatch({
                    type:"ADD_EVENT",
                    payload:{
                        eventid:d.id,
                        title:d.title,
                        description:d.description,
                        creator:d.creator_username,
                        enabled:"true",
                        date:d.create_date,
                        status:d.status,
                        imageurl:d.image_url,
                        listofneeds:d.list_of_needs,
                        moneytarget:d.money_target
                    }})
                )
                forceUpdate();
    
        })
        .catch((e)=>{
            setNetworkError(true); 
        })
    },[reload])


    //this will render on any component render
    const mapSotreToEvents = ()=>{
        if(networkError === true)
        {
            return(<Alert severity="error">something went wrong!</Alert>)
        }
        else
        if((store.getState() === undefined) || (store.getState().length === 0))
        {
            return( <Alert severity="info" style={{fontFamily:"Mate SC"}}>there is no request!</Alert> )
        }
        else
        {
            return(store.getState()
            .map(e=><SingleEvent 
                key={e.eventid} 
                id={e.eventid} 
                eventid={e.eventid} 
                title={e.title} 
                username={e.creator} 
                imageurl={e.imageurl}
                listofneeds={e.listofneeds}
                date={e.date}
                description={e.description}
                moneytarget={e.moneytarget}
                ondelete={deleteEvent}
                onconfirm={confirmEvent}
                onconfrimmodify={modifyEvent}
                onedit={editEvent}/>
                ))

        }
    }

    //three below stateless component will request to change backend data base then 
    //change store properties and send email, which is given by bio request 

    const confirmEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")

        ConfrimRequestedEvent({eventid:res.eventid,feedback:res.feedback,admintoken:localStorage.getItem("token")})
        .then((response)=>{
            if(response.data.success === "1")
            {
                store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})

                let subject ="event number "+res.eventid+" title: "+ res.title+ " confirmed successfully";
                let message="hi "+ res.username+" your event confrimed\nhere is feedback: "+res.feedback;
        
                UserBioRequest({username:res.username})
                .then((responsed)=>{

                    PostEmailRequest({"email":responsed.data.email,subject:subject,message:message})
                    .then((response)=>{

                        setDianogTitle("event number "+res.eventid+" confrimed successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })
                    .catch((e)=>{
                        setDianogTitle("event number "+res.eventid+" confrimed successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })

                })
                .catch((e)=>{
                    setDianogTitle("event number "+res.eventid+" confrimed successfully")
                    setDianogStatusCode("1")
                    setDianogLinearProgressStatus("none")
                })

            }
            else
            {
                setDianogTitle("somthing went wrong")
                setDianogStatusCode("0")
                setDianogLinearProgressStatus("none")
            }
        }).catch((e)=>{
            setDianogTitle("somthing went wrong")
            setDianogStatusCode("0")
            setDianogLinearProgressStatus("none")
        })


    }

    const deleteEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")


        DeleteRequestedEvent({eventid:res.eventid,feedback:res.feedback,admintoken:localStorage.getItem("token")})
        .then((response)=>{
            if(response.data.success === "1")
            {
                store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})

                let subject ="event number "+res.eventid+" title: "+ res.title+ " has been deleted";
                let message="hi "+ res.username+" your event request deleted\nhere is feedback: "+res.feedback;

                UserBioRequest({username:res.username})
                .then((responsed)=>{

                    PostEmailRequest({"email":responsed.data.email,subject:subject,message:message})
                    .then((response)=>{

                        setDianogTitle("event number "+res.eventid+" deleted successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })
                    .catch((e)=>{
                        setDianogTitle("event number "+res.eventid+" deleted successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })

                })
                .catch((e)=>{
                    setDianogTitle("event number "+res.eventid+" deleted successfully")
                    setDianogStatusCode("1")
                    setDianogLinearProgressStatus("none")
                })



            }
            else
            {
                setDianogTitle("somthing went wrong")
                setDianogStatusCode("0")
                setDianogLinearProgressStatus("none")
            }
        }).catch((e)=>{
            setDianogTitle("somthing went wrong")
            setDianogStatusCode("0")
            setDianogLinearProgressStatus("none")
        })

    }

    const editEvent =(res)=>{
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")

        EditRequestForRequestedEvent({eventid:res.eventid,feedback:res.feedback,admintoken:localStorage.getItem("token")})
        .then((response)=>{
            if(response.data.success === "1")
            {

                let subject ="event number "+res.eventid+" title: "+ res.title+ " requested to edit";
                let message="hi "+ res.username+" your event request needs some edit\nhere is feedback: "+res.feedback;

                UserBioRequest({username:res.username})
                .then((responsed)=>{

                    PostEmailRequest({"email":responsed.data.email,subject:subject,message:message})
                    .then((response)=>{

                        setDianogTitle("event number "+res.eventid+" requested for edit successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })
                    .catch((e)=>{
                        setDianogTitle("event number "+res.eventid+" requested for edit successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })

                })
                .catch((e)=>{
                    setDianogTitle("event number "+res.eventid+" requested for edit successfully")
                    setDianogStatusCode("1")
                    setDianogLinearProgressStatus("none")
                })



            }
            else
            {
                setDianogTitle("somthing went wrong")
                setDianogStatusCode("0")
                setDianogLinearProgressStatus("none")
            }
        }).catch((e)=>{
            setDianogTitle("somthing went wrong")
            setDianogStatusCode("0")
            setDianogLinearProgressStatus("none")
        })

    }
    const modifyEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")

        ModifyRequestedEvent({eventid:res.eventid,
            feedback:res.feedback,
            title:res.title,
            description:res.description, 
            listofneeds:res.listofneeds,
            imageurl:res.imageurl,
            moneytarget:res.moneytarget,
            admintoken:localStorage.getItem("token")})
            .then((response)=>{


                if(response.data.success === "1")
                {

                    store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})
    
                    let subject ="event number "+res.eventid+" title: "+ res.title+ " confirmed afrter modified";
                    let message="hi "+ res.username+" your event request confrimed after a few changes\nhere is feedback: "+res.feedback;
    
                    UserBioRequest({username:res.username})
                    .then((responsed)=>{
    
                        PostEmailRequest({"email":responsed.data.email,subject:subject,message:message})
                        .then((response)=>{
    
                            setDianogTitle("event number "+res.eventid+" modified and confirmed successfully")
                            setDianogStatusCode("1")
                            setDianogLinearProgressStatus("none")
                        })
                        .catch((e)=>{
                            setDianogTitle("event number "+res.eventid+" modified and confirmed successfully")
                            setDianogStatusCode("1")
                            setDianogLinearProgressStatus("none")
                        })
    
                    })
                    .catch((e)=>{
                        setDianogTitle("event number "+res.eventid+" modified and confirmed successfully")
                        setDianogStatusCode("1")
                        setDianogLinearProgressStatus("none")
                    })
    
                }
                else
                {
                    setDianogTitle("somthing went wrong")
                    setDianogStatusCode("0")
                    setDianogLinearProgressStatus("none")
                }
                
                
            })
            .catch((e)=>{
                setDianogTitle("somthing went wrong")
                setDianogStatusCode("0")
                setDianogLinearProgressStatus("none")
            })

    }

    
    const CreateDialogButton=()=>
    {
        if(dianogStatusCode==="1")
        {
            return (<div align="center">
                <Button
                onClick={closeDialog}
                variant="contained"
                color="primary"
                size="small"
                style= {{backgroundColor: "#794949",paddingRight:24,paddingLeft:24,marginBottom:24, textAlign: "center"}}
                startIcon={<CheckCircleOutlineIcon />}>
                  ok
                </Button>
                </div>)
        }
        if(dianogStatusCode==="0")
        {
            return (<div align="center">
                <Button
                onClick={closeDialog}
                variant="contained"
                color="primary"
                size="small"
                style= {{backgroundColor: "#e53935",paddingRight:24,paddingLeft:24,marginBottom:24, textAlign: "center"}}
                startIcon={<CheckCircleOutlineIcon />}>
                  ok
                </Button>
                </div>)
        }
    }

    const closeDialog=()=>
    {
        setDianogStatus(false)
        setDianogStatusCode("")
        setDianogTitle("")
    }


    return(<div>


        <Dialog  style={{backgroundColor: 'transparent'}} open={dianogStatus}>
        <DialogTitle>{dianogTitle}</DialogTitle>
        <LinearProgress style={{width:"200px",margin:24, display:dianogLinearProgressStatus}} />
        {CreateDialogButton()}
        </Dialog>

        <Box display="flex"  >
        <Typography  display="block" color="inherit" noWrap  style={{flexGrow: 1}}/>


          <IconButton onClick={forceReload} display="block" position="end" color="primary" aria-label="add to shopping cart" style={{marginBottom:"24px",marginRight:"12px", marginTop:"-24px"}}>
          <SyncIcon/>
          </IconButton>
        </Box>

        <div>{mapSotreToEvents()}</div>
        

        </div>)
}

export default EventRequestRenderer