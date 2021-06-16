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
import BackendImageUrl from '../../../../core/BacknedImageUrl';


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
    const [gender , setGender] = useState('');

    const [imageurl, setImageUrl]= useState('');


    
    //useEffect(()=>{setFirstname("amin")} , []);


    useEffect(()=>{

    ProfileRequest({Username : localStorage.getItem("username")})
    .then((res)=>
    {
        if(res.data.success === "1"){
            setStatus("1")
            setUsernamee(res.data.username)
            setFirstname(res.data.first_name)
            setLastname(res.data.last_name)
            setEmail(res.data.email)
            setUsertype(res.data.user_type)
            setCodemelli(res.data.melli_code)
            if(res.data.gender){
              setGender("1")
            }
            else{
              setGender("0")
            }
            setImageUrl(res.data.image_url)

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
    })
    
  },[])



  const goHome=()=>{
    history.push("/home")

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


      const src = BackendImageUrl()+imageurl;
      
      if(localStorage.getItem("token")=== null)
      {
        return <div style={{padding:"24px"}}>404 page not found</div>
      }
    return(
        <div >



          <img src={photo} 
            style={{
             position:"fixed",
             width:"100%",
             height:"-webkit-fill-available",
             objectFit:"cover",
             zIndex:"-1"
             }}
            />

          <div style={{paddingTop:"20px"}}></div>


          <Container component="main" maxWidth="xs" style={{backgroundColor:"whitesmoke", paddingTop:"16px"}}>



            <div style={{display:"-webkit-flex", justifyContent:"space-between"}}>
              
                <Button
                  variant="contained"
                  onClick={goeditprofile}
                  style= {{
                  backgroundColor: "#4caf50",
                  paddingRight:24,
                  paddingLeft:24,
                  whiteSpace: "nowrap",
                  textAlign: "center"}}   
                  variant="contained"
                  color="primary"       
                  startIcon={<CheckCircleOutlineIcon />}
                  >
                    Edit Profile
               </Button>

               <Button
                  variant="contained"
                  onClick={goHome}
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
            </div>

          <Typography component="h2" variant="h5" style={{fontSize:"30px", fontFamily:"Sigmar One", textAlign:'-webkit-center'}}>
            {usernamee} Profile
          </Typography>

          <div style={{width:'100%',textAlign:'-webkit-center'}}>
          <Avatar alt="Remy Sharp" src={src} style={{width:"200px", height:"200px"}} />
          </div>




             
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
                  <InputLabel  id="demo-simple-select-outlined-label" style={{marginTop:"12px"}}>Gender</InputLabel>
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


               </Grid>
            
          </form>
      </Container>
        </div>
        
    )
}

export default Profile;