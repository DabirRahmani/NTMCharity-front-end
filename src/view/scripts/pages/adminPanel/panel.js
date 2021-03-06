import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './panelItems';
import SingleEvent from './singleEvent';
import ReactDOM from 'react-dom';
import EventRequestRenderer from './eventRequestRenderer'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VerifyUsersRenderer from './verifyUsersRenderer'
import DeliveryRenderer from './deliveryRenderer'
import StoreManagementRenderer from './storManagement/StoreManagementRenderer'
import { useHistory} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home';
import AdminManagementRenderer from './adminManagement/adminManagementRenderer'
import photo from '../img/blue.jpg';

import NeedReqRenderer from './needReq/needReqRenderer';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
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
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

 function Dashboard()
 {


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeSection, setActiveSection]= React.useState("none");

  const signOut=()=>{
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("user_type")
    history.push("/signin")
}

  const eventRequest =()=>{
    setActiveSection("eventRequests")
  }

  const verifyUsers=()=>{
    setActiveSection("verifyUsers")
  }

  const storeManagement=()=>{
    setActiveSection("storeManagement")
  }

  const delivery=()=>{
    setActiveSection("delivery")
  }

  const adminmanagement=()=>{
    setActiveSection("adminmanagement")
  }

  const needreq=()=>{
    setActiveSection("needreq")
  }


  //render menu sections, based on activeSection value, this will change by functions.item
  //which are defined below, its sth similar to delegate set values for each function
  //which are passed to other item components by probs to each menu items
  const RenderSection =()=>{
      switch(activeSection)
      {
        case("eventRequests"):   return(<EventRequestRenderer/>)
        case("verifyUsers"): return(<VerifyUsersRenderer/>)
        case("storeManagement"): return(<StoreManagementRenderer/>)
        case("delivery"): return(<DeliveryRenderer/>)
        case("adminmanagement"): return(<AdminManagementRenderer/>)
        case("needreq"): return(<NeedReqRenderer/>)
        default:return(<div></div>)
      }

  }

  const functions =()=>{
    return ({"eventRequest": eventRequest, 
    "verifyUsers": verifyUsers, 
    "storeManagement": storeManagement,
    "delivery": delivery, 
    "adminmanagement":adminmanagement,
    "needreq":needreq,
  });
  }

  if(localStorage.getItem("user_type")!== "1" && localStorage.getItem("user_type") !== "2")
  {
    return <div style={{padding:"24px"}}>404 page not found</div>
  }
  else
  return (
      <div id="admin-panel" className={classes.root}>
         <img src={photo} 
            style={{
             position:"absolute",
             width:"100%",
             height:"100%",
             objectFit:"fill",
             zIndex:"-1"
             }}
            />

      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{backgroundColor:"#78a6c1"}}>
        <Toolbar className={classes.toolbar}>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} style={{fontFamily:"Mate SC"}}>
            Admin Panel
          </Typography>

          <Typography position="end" component="h1" variant="h6" color="inherit">
            {localStorage.getItem("username")}
          </Typography>

          <IconButton onClick={()=>{history.push("/home")}} >
             <HomeIcon style={{color:"white"}}/>
          </IconButton>

          <IconButton onClick={signOut}>
             <PowerSettingsNewIcon   style={{color:"white"}}/>
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon  />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(functions())}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container id="panel-countainer" maxWidth="lg" className={classes.container}>


          <RenderSection/>


        </Container>
      </main>







    </div>

  );




  

}

export default Dashboard