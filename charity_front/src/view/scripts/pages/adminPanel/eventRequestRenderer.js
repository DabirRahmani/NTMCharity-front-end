import React, {useState} from 'react'
import store from '../../../../core/adminPanel/store/eventManagerStore'
import SingleEvent from './singleEvent'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';
import PostEmailRequest from '../../../../core/sendEmail/sedEmailRequest';






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

    const add4VarToStore=()=>
    {
        
    store.dispatch({
        type:"ADD_EVENT",
        payload:{
            eventid:"1",
            title:"its title for event 1",
            description:"and here is have wrote some description",
            creator:"dabir_rahmani",
            enabled:"true",
            date:"99/11/11",
            status:"status1", 
            imageurl:"",
            listofneeds:{"item1":"some needs","item2":"ab madani"}
        }
    })  

    store.dispatch({
        type:"ADD_EVENT",
        payload:{
            eventid:"2",
            title:"zelzele zadegan jonob",
            description:"salam dar rostaye asb moos kola omad zelzele, matel naken bel dele ",
            creator:"user1",
            enabled:"true",
            date:"000,0,0,0",
            status:"status1", 
            imageurl:"https://cdn.vox-cdn.com/thumbor/wBRCdEaZtpAd2bJBlOhtRC6euVk=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21937385/binglogo.jpg",
            listofneeds:{"item1":"111","item3":"2222","item4":"rr","item5":"eee","item2h":"gdf","item2g":"sfdsg","itemf2":"gfdog","itejm2":"gufdg","itlem2":"gfdkg","ite;m2":"gfdhg","ite'm2":"gfdgg","ityem2":"gfdgd"}
        }
    })  

    store.dispatch({
        type:"ADD_EVENT",
        payload:{
            eventid:"3",
            title:"title1",
            description:"description1",
            creator:"creator1",
            enabled:"true",
            date:"date1",
            status:"status1", 
            imageurl:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Bing_logo_%282016%29.svg",
            listofneeds:{}
        }
    })  

    store.dispatch({
        type:"ADD_EVENT",
        payload:{
            eventid:"4",
            title:"title1",
            description:"description1",
            creator:"creator1",
            enabled:"true",
            date:"date1",
            status:"status1", 
            imageurl:"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            listofneeds:{"item2":"2222"}
        }
    })  
    forceUpdate();
    }

    const mapSotreToEvents = ()=>{
        if(store.getState() === undefined)
        {
            return( <Alert severity="info">there is no request!</Alert> )
        }
        else 
        if(store.getState().length === 0 )
        {
            return(<Alert severity="info">there is no request!</Alert>)
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
                ondelete={deleteEvent}
                onconfirm={confirmEvent}
                onconfrimmodify={modifyEvent}/>))

        }
    }

    const confirmEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")


        store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})

        setDianogTitle("event number "+res.eventid+" confrimed successfully")
        setDianogStatusCode("1")
        setDianogLinearProgressStatus("none")
    }

    const deleteEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")

        store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})

        setDianogLinearProgressStatus("none")
        setDianogTitle("event number "+res.eventid+" deleted successfully")
        setDianogStatusCode("1")
    }

    const modifyEvent = (res)=>
    {
        setDianogStatus(true)
        setDianogLinearProgressStatus("block")

        let subject ="event number "+res.eventid+" title: "+ res.title+ " modified and confirmed successfully";
        let message="hi "+" "+ res.username+" your event confrimed\n here is feedback: "+res.feedback;

        PostEmailRequest({"email":"jbuhubhakq@nucleant.org",subject,message})
        .then((response)=>{console.log(response)})
        
        store.dispatch({type:"DELETE_EVENT", payload:{eventid:res.eventid}})


        setDianogTitle("event number "+res.eventid+" modified and confirmed successfully")
        setDianogStatusCode("1")
        setDianogLinearProgressStatus("none")

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
                style= {{backgroundColor: "#4caf50",paddingRight:24,paddingLeft:24,marginBottom:24, textAlign: "center"}}
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
        <LinearProgress style={{margin:24, display:dianogLinearProgressStatus}} />
        {CreateDialogButton()}
        </Dialog>

        <Button onClick={add4VarToStore}>addd</Button>

        <div>{mapSotreToEvents()}</div>
        

        </div>)
}

export default EventRequestRenderer