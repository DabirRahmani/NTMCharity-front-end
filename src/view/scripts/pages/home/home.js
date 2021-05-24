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
import Donate from '../donate/donate'
import GDonate from '../donate/generaldonate'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import GDonatelogedin from '../donate/generaldonatelogedin'


const Home =()=>
{
    const [eventList,seteventList]=useState([]);
    const [reload, setReload] = useState(0);

    const history = useHistory();

    const [requestDialogStatus, setRequestDialogStatus] = useState(false);
    const [donateDialogStatus, setDonateDialogStatus] = useState(false);

    const [pageNumber, setPageNumber]= useState(1)

    const [pageCount, setPageCount] = useState(1)

    const [donatedmoney, setdonatedmoney]= useState()

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

    const renderDonateDialog=()=>{
        if(donateDialogStatus === true)
        {
            if(localStorage.getItem("token")===null)
            {

                return <GDonate close={ccloseDialog} id="redialog" />
            }
            else if(localStorage.getItem("user_type")==="3")
            {
                return <GDonatelogedin close={ccloseDialog} id="redialog" />
            }
        }
      }

    const oopenDialog =()=>
    {
        setDonateDialogStatus(true);
    }
  
    const ccloseDialog=()=>{
        setDonateDialogStatus(false);
    }

    const signupBarAlert =()=>
    {
        if(localStorage.getItem("token")=== null)
        return <Alert  
        severity="info" 
        style={{marginLeft: "20%", marginRight: "20%", marginTop: "16px", marginBottom: "16px"}} 
        >

        You are not signed in, 

        <Button
        variant="contained"
        size="small" 
        color="primary"
        style={{background:"#ffc107", marginLeft:"4px", marginRight:"4px"}}
        href="/signup"
        >
            signup
        </Button>
        or
        <Button
        variant="contained"
        size="small" 
        color="primary"
        style={{background:"#ffc107", marginLeft:"4px", marginRight:"4px"}}
        href="/signin"
        >
            signin
        </Button>
        to continue
        </Alert>

    }

    const createDonateButton=()=>{

        if(localStorage.getItem("user_type")!="4")
        {
            return <Button 
            onClick={oopenDialog}
            variant="contained"
            size="small"
            size="small" 
            style={{background:"#4caf50"}}>General Donate 
            </Button>
        }
  
      }

    const CreateOpenRequestButton =()=>{

        if(localStorage.getItem("token") !== null)
        return <Button 
        variant="contained"
        size="small"
        onClick={openDialog} 
        size="small"  >
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

            <CssBaseline />

             <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px"}}>
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
        <div style={{marginBottom:"8px",marginLeft:"16px",marginRight:"16px", fontSize:"24px"}}>Active events</div>

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

        <AccordionActions>
            {renderDonateDialog()}
            {createDonateButton()}

        </AccordionActions>

        </div>
        </div>
    )
}
export default Home;
