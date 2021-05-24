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
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import GetLastTransactions from '../../../../core/home/trnasaction'

const Home =()=>
{
    const [eventList,seteventList]=useState([]);
    const [reload, setReload] = useState(0);

    const history = useHistory();

    const [requestDialogStatus, setRequestDialogStatus] = useState(false);

    const [pageNumber, setPageNumber]= useState(1)

    const [pageCount, setPageCount] = useState(1)

    const [searchKey, setSearchKey] = useState("")

    const [lastTransActions, setLastTransActions] = useState([]);

    useEffect(()=>{
        GetEvents({key:searchKey,number:pageNumber})
        .then((res)=>{

            if(res.data.event_set !== null)
            if(res.data.event_set !== undefined)
            {
                seteventList(Object.values(res.data.event_set))
                setPageCount(res.data.pagination_params.the_last_page)
            } else {seteventList([])}
            else {seteventList([])}
        })

        GetLastTransactions({count:"10"})
        .then(e=> {
            console.log(e)
            
            if(e.data.success === "1")
            {
                setLastTransActions(Object.values(e.data.transaction_set))

            }
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
          <IconButton onClick={goProflie} >
             <AccountCircleIcon    style={{color:"#ffc107"}}/>
          </IconButton>

          {showadminpanelButton()}

          <IconButton onClick={signOut} >
             <PowerSettingsNewIcon    style={{color:"#ffc107"}}/>
          </IconButton>

          
        </div>
    }

    const showadminpanelButton =()=>{
        if(localStorage.getItem("user_type") === "1")
        return <IconButton onClick={goAdminPanel}>
            <SettingsIcon    style={{color:"#ffc107"}}/>
            </IconButton>
    }

    const goAdminPanel=()=>{
        history.push('./admin-panel')

    }

    const handlePageNumber=(event, value)=>{
        setPageNumber(value)
        setReload(reload+1)
    }


    const CreateTable =()=>{

        return <TableContainer>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell >Amount</TableCell>
              <TableCell >Event ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastTransActions.map((item) => (
              <TableRow key={item.id + "tr"}>
                <TableCell >{item.username}</TableCell>
                <TableCell >{item.amount}</TableCell>
                <TableCell >{item.event_title} (id:{item.event_id})</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

        return(
         <div >

            <CssBaseline />

             <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap"}}>

                <Typography style={{fontSize:"30px"}}>
                NTM CHARITY!
                </Typography>

                <div style={{ minWidth: "40%", maxWidth: "40%"}}>
                <Search
                onclick={SearchClick}
                />
                </div> 

                <div style={{ width: '-webkit-fill-available'}}> </div>

                <Typography position="end" component="h1" variant="h6" color="inherit">
                    {localStorage.getItem("username")}
                </Typography>

                {createActionButtons()}





            </Toolbar>
        </AppBar>



        {signupBarAlert()}

        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems:"flex-start"}}>

        <div style={{marginLeft:"5%",marginRight:"5%",marginTop:"24px", backgroundColor:"inherit", minWidth:"50%",maxWidth:"50%"}}>

            <div style={{display:"-webkit-box"}} >
            <div style={{marginBottom:"8px",marginLeft:"16px",marginRight:"16px", fontSize:"24px"}}>Active events</div>

            {CreateOpenRequestButton()}
            </div>

            <EventRenderer eventList={eventList}/>

            <Pagination page={pageNumber} count={pageCount} color="primary" onChange={handlePageNumber} style={{paddingTop:"40px" }}/>

            <div style={{marginBottom:"32px"}}></div>
        </div>

            
            <Paper style={{marginRight:"5%", marginTop:"56px", minWidth:"auto", width:"-webkit-fill-available", padding:"12px", marginBottom:"180px"}}>
                <div style={{textAlign:"-webkit-center", marginTop:"8px", fontWeight:"bold"}}> Latest transitions</div>
                {CreateTable()}
                <div style={{textAlign:"-webkit-center", marginTop:"24px", fontWeight:"bold"}}> Top transaction amouts</div>
            </Paper>


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
