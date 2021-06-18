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
import Avatar from '@material-ui/core/Avatar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import clsx from 'clsx';

import Donate from '../donate/donate'
import GDonate from '../donate/generaldonate'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import GDonatelogedin from '../donate/generaldonatelogedin'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {GetLastTransactions} from '../../../../core/home/trnasaction'
import {GetTopTransactions} from '../../../../core/home/trnasaction'

import NeedReqDialog from './needRequest/NeedReqDialog';
import DonateProduct from '../donate/donateproduct';
import photo from '../img/signin.png'
import GitHubIcon from '@material-ui/icons/GitHub';

import requestedlist from './rquestEvent/requestedList'
import UserBioRequest from '../../../../core/userBioRequest'
import BackendImageUrl from '../../../../core/BacknedImageUrl'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
}));


const Home =()=>
{

    const classes = useStyles();

    const [open, setOpen] = useState(false)

    const [eventList,seteventList]=useState([]);

    const [reload, setReload] = useState(0);

    const history = useHistory();

    const [requestDialogStatus, setRequestDialogStatus] = useState(false);

    const [donateDialogStatus, setDonateDialogStatus] = useState(false);

    const [pageNumber, setPageNumber]= useState(1)

    const [pageCount, setPageCount] = useState(1)

    const [donatedmoney, setdonatedmoney]= useState()

    const [searchKey, setSearchKey] = useState("")

    const [lastTransActions, setLastTransActions] = useState([]);

    const [topTransActions, setTopTransActions] = useState([]);

    const [NeedReqDialogStatus, setNeedReqDialogStatus]=useState(false);

    const [poductDialogStatus,setPoductDialogStatus] = useState(false);

    const [avatar, setAvatar] = useState("")

    const [userVerified, setUserVerified] = useState(false)

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

            
            if(e.data.success === "1")
            {
                var vv= Object.values(e.data.transaction_set)
                setLastTransActions(vv.sort((a,b)=>{ if(a.id > b.id) return -1; return 1}))

                GetTopTransactions({count:"10"})
                .then(e=> {
                    
                    if(e.data.success === "1")
                    {
                        var v= Object.values(e.data.transaction_set)
                        setTopTransActions(v.sort((a,b)=>{ if(a.amount > b.amount) return -1; return 1}))
                    }
                })

            }
        })


    },[reload])


    useEffect(()=>{
        UserBioRequest({username: localStorage.getItem("username")})
        .then(e=>{
            setUserVerified(e.data.verified_needy)
            setAvatar(e.data.image_url)
        })
    },[])



    const closeNeedDialog=()=>{
        setNeedReqDialogStatus(false);
    }

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

    const NeedReqDialogRenderer=()=>{

        if(NeedReqDialogStatus === true)
        return <NeedReqDialog id="redialog"  closeDialog={closeNeedDialog}/>

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
            if((localStorage.getItem("token")===null) )
            {
                return <GDonate close={ccloseDialog} id="redialog" />
            }
            else if((userVerified === false))
            {
                return <GDonatelogedin close={ccloseDialog} profilestatus="false" id="redialog" />
            }
            else
            {
                return <GDonatelogedin close={ccloseDialog} id="redialog" />
            }
        }
      }

      const renderDonateProducrDialog=()=>{
        if(poductDialogStatus === true)
        {
            if(localStorage.getItem("user_type")!=="4")
            {
                return <DonateProduct close={ccloseDialog} id="redialog" />
            }
        }
      }


      const openNeedDialog =()=>
      {
          setNeedReqDialogStatus(true);
      }
      



    const oopenDialog =()=>
    {
        setDonateDialogStatus(true);
    }
  
    const ccloseDialog=()=>{
        setDonateDialogStatus(false);
        setPoductDialogStatus(false);
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
        style={{background:"#1890ff", marginLeft:"4px", marginRight:"4px",fontFamily:"Orelega One"}}
        href="/signup"
        >
            signup
        </Button>
        or
        <Button
        variant="contained"
        size="small" 
        color="primary"
        style={{background:"#1890ff", marginLeft:"4px", marginRight:"4px",fontFamily:"Orelega One"}}
        href="/signin"
        >
            signin
        </Button>
        to continue
        </Alert>

    }

    
    const openProduct =()=>{
        setPoductDialogStatus(true)
    }

    const CreateOpenRequestButton =()=>
    {

        if(localStorage.getItem("token") !== null)
        if(localStorage.getItem("user_type") !== "4")
        return <Button 
        variant="contained"
        size="small"
        onClick={openDialog} 
        size="small" 
        style={{fontFamily:"Orelega One", marginRight:"8px"}} >
            Request New Event
       </Button>

    }

    const createDonateButton=()=>{

        if(localStorage.getItem("user_type")!=="4")
        {
            return <Button
            onClick={oopenDialog}
            variant="contained"
            size="small"
            size="small" 
            style={{fontFamily:"Orelega One", marginRight:"8px"}}>General Donate 
            </Button>
        }
  
      }


    const createProductDonateButton=()=>{

        if(localStorage.getItem("user_type")!=="4")
        {
            return <Button 
            onClick={openProduct}
            variant="contained"
            size="small"
            size="small" 
            style={{fontFamily:"Orelega One", marginRight:"8px"}}>Donate Product 
            </Button>
        }
  
      }



    const CreateOpenNeedRequestButton =()=>{

        if(localStorage.getItem("user_type") === "4")
        return <Button 
        style={{whiteSpace: 'nowrap',fontFamily:"Orelega One", marginRight:"8px"}}
        variant="contained"
        size="small"
        onClick={openNeedDialog} 
        size="small"  >
            New Need Req
            
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

    const src =BackendImageUrl()+avatar;

    const createActionButtons=()=>{
        if(localStorage.getItem("token") !== null)
        return <div>
          <IconButton onClick={goProflie} >
             <Avatar src={src}/>
          </IconButton>

          {showadminpanelButton()}

          <IconButton onClick={signOut}>
             <PowerSettingsNewIcon style={{color:"#FF0000"}}/>
          </IconButton>

          
        </div>
    }

    const showadminpanelButton =()=>{
        if((localStorage.getItem("user_type") === "1") || (localStorage.getItem("user_type") === "2"))
        return <IconButton onClick={goAdminPanel}>
            <SettingsIcon/>
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
              <TableCell style={{fontFamily:"Mate SC"}}>Username</TableCell>
              <TableCell style={{fontFamily:"Mate SC"}}>Amount</TableCell>
              <TableCell style={{fontFamily:"Mate SC"}}>Event ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastTransActions.map((item) => (
              <TableRow key={item.id + "tr"}>
                {createtablecellusername({username:item.username})}
                <TableCell style={{fontFamily:"Mate SC"}}>{item.amount}</TableCell>
                {createtablecellid({title:item.event_title , id:item.event_id})}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    
    const CreateTable02 =()=>{

        return <TableContainer>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell style={{fontFamily:"Mate SC"}}>Username</TableCell>
              <TableCell style={{fontFamily:"Mate SC"}}>Amount</TableCell>
              <TableCell style={{fontFamily:"Mate SC"}}>Event ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topTransActions.map((item) => (
              <TableRow key={item.id + "tr"}>
                {createtablecellusername({username:item.username})}
                <TableCell style={{fontFamily:"Mate SC"}}>{item.amount}</TableCell>
                {createtablecellid({title:item.event_title , id:item.event_id})}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    const createtablecellusername =({username})=>{
        if(username === undefined)
        return <TableCell style={{fontFamily:"Mate SC"}}>Guest</TableCell>

        if(username === null)
        return <TableCell style={{fontFamily:"Mate SC"}}>Guest</TableCell>

        return <TableCell style={{fontFamily:"Mate SC"}}>{username}</TableCell>


    }
    
    const CreateButtons=()=>{
        if (userVerified===true) 
            return <div>
                {CreateOpenRequestButton()}
                {createProductDonateButton()}
                {CreateOpenNeedRequestButton()}
                </div>

        else if(localStorage.getItem("token") !== null) return <div style={{alignSelf: 'center', paddingRight: '8px', paddingLeft: '16px'}}>WARNING: Your account is not verified yet, so you cant create event</div>
    }

    const createtablecellid =({id, title})=>
    {
        if(id === undefined)
        return <TableCell style={{fontFamily:"Mate SC"}}>General</TableCell>

        if(id === null)
        return <TableCell style={{fontFamily:"Mate SC"}}>General</TableCell>


        return <TableCell style={{fontFamily:"Mate SC"}}>{title} (id:{id})</TableCell>

    }

        return(
         <div >
             
          
            <img src={photo} 
            style={{
             position:"fixed",
             width:"100%",
             height:"-webkit-fill-available",
             objectFit:"cover",
             zIndex:"-2"
             }}
            />

            <CssBaseline />

            <AppBar position="fixed"  >
             <Toolbar style={{whiteSpace: "nowrap", paddingRight:"24px"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px", fontFamily:"Dancing Script"}}>
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




        <div style={{marginTop:"24px",marginRight:"3%", marginLeft:"3%"}}>


        
        <div style={{display: "inline-flex",flexWrap:"wrap", flexDirection: "row", alignItems:"flex-start", justifyContent:"space-evenly", width:"100%", marginTop:"70px"}}>


        {signupBarAlert()}


            <div style={{minWidth:"550px",width:"55%",maxWidth:"50%"}}>

                <div style={{display:"flex",flexWrap:"wrap", marginBottom:"8px"}} >

                {CreateButtons()}
                
                
                {createDonateButton()}

                </div>

                <div style={{marginBottom:"8px",marginLeft:"10px",marginRight:"10px", fontSize:"24px",fontFamily:"Sigmar One"}}>Active events</div>


                <EventRenderer eventList={eventList} profilestatus={userVerified}/>

                <Pagination page={pageNumber} count={pageCount} color="primary" onChange={handlePageNumber} style={{paddingTop:"40px" }}/>

                <div style={{marginBottom:"32px"}}></div>
            </div>

            
            <Paper style={{ marginTop:"24px", width:"-webkit-fill-available", padding:"12px", minWidth:"400px",maxWidth:"400px", marginBottom:"50px"}}>
                <div style={{textAlign:"-webkit-center", marginTop:"8px", fontWeight:"bold",fontFamily:"Sigmar One"}}> Latest transitions</div>
                {CreateTable()}
                <div style={{textAlign:"-webkit-center", marginTop:"24px", fontWeight:"bold",fontFamily:"Sigmar One"}}> Top transaction amouts</div>
                {CreateTable02()}
            </Paper>


        </div>



        
        </div>



        <div>
        <Grid container >
        <Grid item xs={1}/>
        <Grid item xs={10}>
        {requestDialogRenderer()}
        </Grid>
        <Grid item xs={1}/>
        </Grid>


            {renderDonateDialog()}
            {renderDonateProducrDialog()}
            {NeedReqDialogRenderer()}

        </div>


        <div id="footer" style={{ maxWidth:"100%", minWidth: "100%", backgroundColor:"#263273", minHeight:"150px", padding:"32px", paddingTop: "-16px", display: "flex"}}>
        
        
        <div style={{display:"grid", minWidth:"30%"}}>

            <a href="https://github.com" target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
            <GitHubIcon style={{verticalAlign:"top"}}/>
            <div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>Back-End</div>
            </a>
            <a href="https://github.com" target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
            <GitHubIcon style={{verticalAlign:"top"}}/>
            <div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>Front-End</div>
            </a>
            <a href={"mailto:"+"ntm.patronage@gmail.com"} target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
            <AlternateEmailIcon style={{verticalAlign:"top"}}/>
            <div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>E-mail</div>
            </a>
        </div>


        <div style={{width:"100%", textAlign:"center", alignSelf:"center",color:"#fff"}}>(working on it)</div>
            


        </div>
        
        </div>
        
    )
}
export default Home;