import React, { useState , useEffect} from 'react'
import ProfileRequest from '../../../../core/profile/profilepagerequest';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';

import { Container } from '@material-ui/core';
import photo from '../img/signin.png';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';


const Profile =() =>{
    
    const history = useHistory();
    const [status , setStatus] = useState('');
    const [usernamee , setUsernamee] = useState('');
    const [disableViews, setDisableViews] = useState(true);
    const [firstname , setFirstname] = useState('');
    const [lastname , setLastname] = useState('');
    const [email , setEmail] = useState('');
    const [usertype , setUsertype] = useState('');
    const [codemelli , setCodemelli] = useState('');
    const [job , setJob] = useState('');
    const [address , setAddress] = useState('');
    const [mobilenumber , setMobilenumber] = useState('');
    const [housephone , setHousephone] = useState('');
    const [workplacephone , setWorkplacephone] = useState('');
    const [gender , setGender] = useState('');
    const [married , setMarreid] = useState('');
    const [birthdate , setBirthdate] = useState('');
    const [isprofilecompleted , setIsprofilecompleted] = useState('');
    const [ismobilevarified , setIsmobilevarified] = useState('');
    const [isemailvarified , setIsemailvarified] = useState('');
    
    //useEffect(()=>{setFirstname("amin")} , []);


    useEffect(()=>{

    ProfileRequest({Username : localStorage.getItem("username")})
    .then((res)=>
    {
        console.log(res);
        if(res.data.success === "1"){
            setStatus("1")
            setUsernamee(res.data.username)
            setFirstname(res.data.first_name)
            setLastname(res.data.last_name)
            setEmail(res.data.email)
            setUsertype(res.data.user_type)
            setCodemelli(res.data.melli_code)
            setJob(res.data.job)
            setAddress(res.data.address)
            setMobilenumber(res.data.mobile_number)
            setHousephone(res.data.house_phone)
            setWorkplacephone(res.data.workplace_phone)
            if(res.data.gender){
              setGender("1")
            }
            else{
              setGender("0")
            }
            setMarreid(res.data.married)
            setBirthdate(res.data.birth_date)
            setIsprofilecompleted(res.data.is_profile_completed)
            setIsmobilevarified(res.data.verified_mobile)
            setIsemailvarified(res.data.verified_email)
        }
        else if(res.data.success === "0")
        {
            if(res.data.error === "notLoggedIn")
            {
                setStatus("notLoggedIn");
            }
            else if(res.data.error === "DoesNotExist")
            {
                setStatus("DoesNotExist");
            }
        }
    }).catch((er)=>{console.log(er)});
    
  },[])



  const goHome=()=>{
    history.push("/")

  }


    const goeditprofile =()=>{
        history.push("/editprofile")
      }

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        formControl: {
          width: '100%'
        },
        margiiin:{
          margin: '12px'
        }
      }));
      const classes = useStyles();
      
      if(localStorage.getItem("token")=== null)
      {
        return <div style={{padding:"24px"}}>404 page not found</div>
      }
    return(
        <div>
            <div style={{
                display:"flow-root",
                justifyContent:"space-around",
                margin:"20px 0px",
            }}>
                
                <Container component="main" maxWidth="xs">
                <AppBar position="static" width="100%">
             <Toolbar style={{whiteSpace: "nowrap"}}>
               
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px", fontFamily:"Dancing Script"}}>
                NTM CHARITY!
                </Typography>
            </Toolbar>
        </AppBar>

        <div className={classes.paper}>
          <Typography component="h2" variant="h5" style={{fontSize:"30px", fontFamily:"Sigmar One"}}>
            {usernamee} Profile
          </Typography>

          <img src={photo} 
                style={{
                  position:"absolute",
                  width:"100%",
                  left:"50%",
                  top:"50%",
                  Height:"100%",
                  objectFit:"cover",
                  transform:"translate(-50% , -50%)",
                  zIndex:"-1"
                }}
             />
             
          <form className={classes.form} noValidate>
            <Grid container>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="fn"
                 label="FirstName"
                 value={firstname}
                 required
                 variant="filled"
                 style={{ width:'100%'}}
               />
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
               <TextField
               disabled={disableViews}
                 id="ln"
                 label="LastName"
                 value={lastname}
                 required
                 variant="filled"
                 style={{ width:'100%'}}
                 fullWidth
                />
                
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                <FormControl variant="outlined" style={{ width:'100%'} } disabled={disableViews}>
                  <InputLabel  id="demo-simple-select-outlined-label">Gender</InputLabel>
                  <Select
                    value={gender}
                    label="Gender"
                    variant="filled"
                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="mc"
                 label="MelliCode"
                 value={codemelli}
                 variant="filled"
                 required
                 style={{ width:'100%'}}
                 />
                 
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="j"
                 label="Job"
                 value={job}
                 variant="filled"
                 style={{ width:'100%'}}
                 />
               </Grid>
                 <Grid item xs={12} className={classes.margiiin}> 
                   <TextField
                   disabled={disableViews}
                   id="mb"
                   label="MobileNumber"
                   value={mobilenumber}
                   required
                   variant="filled"
                   style={{ width:'100%'}}
                   />
                   
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                   <TextField
                   disabled={disableViews}
                     id="hp"
                     label="HousePhone"
                     value={housephone}
                     variant="filled"
                     style={{ width:'100%'}}
                   />
                   </Grid>
                   <Grid item xs={12} className={classes.margiiin}>
                   <TextField
                   disabled={disableViews}
                     id="wp"
                     label="WorkplacePhone"
                     value={workplacephone}
                     variant="filled"
                     style={{ width:'100%'}}
                   />
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                  <TextField
                  disabled={disableViews}
                    id="a"
                    value={address}
                    label="Address"
                    //defaultValue={address}
                    variant="filled"
                    style={{ width:'100%' , height:'20%'}}
                  />
               </Grid>
               <Button
                  className={classes.margiiin}
                  variant="contained"
                  style={{ width:'50%', display:"inline-block" , fontFamily:"Sigmar One"}}
                  onClick={goeditprofile}
                  //size="small"
                  style= {{
                  backgroundColor: "#4caf50",
                  paddingRight:24,
                  paddingLeft:24,
                  whiteSpace: "nowrap",
                  textAlign: "center"}}   
                  //fullWidth
                  variant="contained"
                  color="primary"       
                  startIcon={<CheckCircleOutlineIcon />}
                  >
                    Edit Profile
               </Button>

               <Button
                  className={classes.margiiin}
                  variant="contained"
                  style={{ width:'50%', display:"inline-block" , fontFamily:"Orelega One"}}
                  onClick={goHome}
                  //size="small"
                  style= {{
                  backgroundColor: "#ffc107",
                  paddingRight:24,
                  paddingLeft:24,
                  whiteSpace: "nowrap",
                  textAlign: "center"}}   
                  variant="contained"
                  color="primary"       
                  startIcon={<HomeIcon />}
                  >
                    home
               </Button>
               </Grid>
            
          </form>
        </div>
      </Container>
            </div>
        </div>
        
    )
}

export default Profile;