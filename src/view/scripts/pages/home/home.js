import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Search from './search'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import react ,{ Component, useState , useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import SingleEvent from '../home/singleEvent'
import GetRequestedEvents from '../../../../core/eventRequests/getRequestedEvents'
import GetEvents from '../../../../core/home/events'
import EventRenderer from './eventRenderer'
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Pagination from '@material-ui/lab/Pagination'
import RequestEventDialog from './rquestEvent/requestDialog'
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useHistory} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { Height } from '@material-ui/icons';


const Home =()=>
{
    const [eventList,seteventList]=useState([]);
    const [reload, setReload] = useState(0);

    const history = useHistory();

    const [requestDialogStatus, setRequestDialogStatus] = useState(false);

    const [pageNumber, setPageNumber]= useState(1)

    const [pageCount, setPageCount] = useState(1)

    const [searchKey, setSearchKey] = useState("")

    useEffect(()=>{
        GetEvents({key:searchKey,number:pageNumber})
        .then((res)=>{
            console.log(res);
            if(res.data.event_set !== null)
            if(res.data.event_set !== undefined)
            {
                seteventList(Object.values(res.data.event_set))
                setPageCount(res.data.pagination_params.the_last_page)
            } else {seteventList([])}
            else {seteventList([])}
        })
    },[reload])

    const SearchClick = (props) =>{
        GetEvents({key:props,number:"1"})
        .then((res)=>{
            setPageNumber(1)
            setSearchKey(props)

            if(res.data.event_set !== null)
            if(res.data.event_set !== undefined)
            {
                seteventList(Object.values(res.data.event_set))
                setPageCount(res.data.pagination_params.the_last_page)
            } 
            else 
            {
                seteventList([])
                setPageCount(1)
            }
            else 
            {
                seteventList([])
                setPageCount(1)

            }
        })
        
    }

    const openDialog =()=>
    {
        setRequestDialogStatus(true);
    }

    const closeDialog=()=>{
        setRequestDialogStatus(false);
    }

    const requestDialogRenderer=()=>{

        if(requestDialogStatus === true)
        return <RequestEventDialog id="redialog"  closeDialog={closeDialog}/>

    }

    const signupBarAlert =()=>
    {
        if(localStorage.getItem("token")=== null)
        return <Alert  
        severity="info" 
        style={{marginLeft: "20%", marginRight: "20%", marginTop: "16px", marginBottom: "16px",fontFamily:"Mate SC"}} 
        >

        You are not signed in, 

        <Button
        variant="contained"
        size="small" 
        color="primary"
        style={{background:"#ffc107", marginLeft:"4px", marginRight:"4px",fontFamily:"Orelega One"}}
        href="/signup"
        >
            signup
        </Button>
        or
        <Button
        variant="contained"
        size="small" 
        color="primary"
        style={{background:"#ffc107", marginLeft:"4px", marginRight:"4px",fontFamily:"Orelega One"}}
        href="/signin"
        >
            signin
        </Button>
        to continue
        </Alert>

    }

    const CreateOpenRequestButton =()=>{

        if(localStorage.getItem("token") !== null)
        return <Button 
        variant="contained"
        size="small"
        onClick={openDialog} 
        size="small" 
        style={{fontFamily:"Orelega One"}} >
            Request New Event
       </Button>
    }

    const goProflie =()=>{
        history.push('./profile')
    }

    const signOut =()=>{
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("user_type")
        history.push("/signin")
    }

    const createActionButtons=()=>{
        if(localStorage.getItem("token") !== null)
        return <div>
          <IconButton >
             <AccountCircleIcon onClick={goProflie}   style={{color:"#ffc107"}}/>
          </IconButton>

          {showadminpanelButton()}

          <IconButton >
             <PowerSettingsNewIcon onClick={signOut}   style={{color:"#ffc107"}}/>
          </IconButton>

          
        </div>
    }

    const showadminpanelButton =()=>{
        if(localStorage.getItem("user_type") === "1")
        return <IconButton >
            <SettingsIcon onClick={goAdminPanel}   style={{color:"#ffc107"}}/>
            </IconButton>
    }

    const goAdminPanel=()=>{
        history.push('./admin-panel')

    }

    const handlePageNumber=(event, value)=>{
        setPageNumber(value)
        setReload(reload+1)
    }

        return(
         <div >
             
             <video autoPlay loop muted 
             style={{
                 position:"fixed",
                 width:"100%",
                 height:"-webkit-fill-available",
                 objectFit:"cover",
                 zIndex:"-1"
             }}
             >
             <source src="https://aspb14.cdn.asset.aparat.com/aparat-video/2ea268816548e03a178d3c7d3cb2939116315664-720p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImEwNmQ5MDEyZTg3M2ExN2E0M2NlZWY5YjY4NDk0OWVkIiwiZXhwIjoxNjIyODk5MDE1LCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.YT4VEhQ7WbRxHzffdE0XWkQrOlxpfCj3Au_0m6vJ9fU"/>
             </video>
            <CssBaseline />

             <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px", fontFamily:"Dancing Script"}}>
                NTM CHARITY!
                </Typography>
                <div style={{marginLeft: "30%", width: "40%"}}>
                <Search
                onclick={SearchClick}
                />
                </div> 

                <Typography position="end" component="h1" variant="h6" color="inherit">
                    {localStorage.getItem("username")}
                </Typography>

                {createActionButtons()}

            </Toolbar>
        </AppBar>

        {signupBarAlert()}
        
        <div style={{marginLeft:"10%",marginRight:"10%",marginTop:"24px", backgroundColor:"inherit"}}>

        <div style={{display:"-webkit-box"}} >
        <div style={{marginBottom:"8px",marginLeft:"16px",marginRight:"16px", fontSize:"24px",fontFamily:"Sigmar One"}}>Active events</div>

        {CreateOpenRequestButton()}
        </div>

            <EventRenderer 
            eventList={eventList}
            />

            <Pagination page={pageNumber} count={pageCount} color="primary" onChange={handlePageNumber} style={{paddingTop:"40px" }}/>

            <div style={{marginBottom:"32px"}}></div>
        </div>
        <div>
            
        <Grid container >
        <Grid item xs={1}/>

        <Grid item xs={10}>
        {requestDialogRenderer()}

        </Grid>

        <Grid item xs={1}/>
        </Grid>
        
        </div>
        </div>
        
    )
}
export default Home;
