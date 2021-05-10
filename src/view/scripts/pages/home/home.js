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

const Home =()=>
{
    const [arr,setArr]= useState();
    const [eventList,seteventList]=useState([]);
    const [reload, setReload] = useState(0);

    useEffect(()=>{
        GetRequestedEvents({token:localStorage.getItem("token")})
        .then((res)=>{
            setArr(Object.values(res.data.event_set))
        })
        GetEvents({key:"",number:"1"})
        .then((res)=>{
            console.log(res);
            seteventList(Object.values(res.data.event_set))
        })
    },[reload])
    const SearchClick = (props) =>{
        console.log(props)
        GetEvents({key:props,number:"1"})
        .then((res)=>{
            console.log(res);
            seteventList(Object.values(res.data.event_set))
        })
        
    }

        return(
         <body style={{backgroundColor:"Lavender", minHeight: "100vh"}}>
             <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography variant="title" color="black" style={{fontSize:"30px"}}>
                NTM CHARITY!
                </Typography>
                <div style={{marginLeft: "50%", width: "40%"}}>
                <Search
                onclick={SearchClick}
                />
                </div> 
            </Toolbar>
        </AppBar>
        <div>
        <Button size="small" href="/signup" margin="20%" style={{  position: "absolute", left: "2%" , top: "12%"}}>signup</Button>
             <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              >
              </Typography>
              
        <Button size="small" href="/signin" margin="80%"  style={{  position: "absolute", left: "2%" , top: "17%"}}>Login</Button>
             <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              
              >
              </Typography>
              </div>
        <div>
           
         <Button size="small"style={{  position: "absolute", left: "85%" , top: "12%"}}>open requests</Button>

             <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  >
                 </Typography>

        </div>
        
        <div style={{margin:"10%", backgroundColor:"inherit"}}>

            <EventRenderer 
            eventList={eventList}
            />
            <Pagination count={10} color="primary" style={{paddingTop:"40px" }}/>
        </div>
        <div>
            
        <Grid container spacing={10000}>
        <Grid item xs={1}/>

        <Grid item xs={10}>
        </Grid>

        <Grid item xs={1}/>
        </Grid>

        </div>
        </body>
    )
}
export default Home;
