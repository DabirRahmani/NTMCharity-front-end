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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';


const Profile =(RequestedUsername) =>{
    
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
            setGender(res.data.gender)
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
      

    return(
        <div>
            <div style={{
                display:"flow-root",
                justifyContent:"space-around",
                margin:"20px 0px",
                borderBottom:"1px solid blue"
            }}>
                
                <Container component="main" maxWidth="xs">

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {usernamee} Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={20}>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="fn"
                 label="FirstName"
                 value={firstname}
                 required
                 variant="outlined"
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
                 variant="outlined"
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
                  >
                    <MenuItem value={5}>Male</MenuItem>
                    <MenuItem value={6}>Female</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="mc"
                 label="MelliCode"
                 value={codemelli}
                 variant="outlined"
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
                 variant="outlined"
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
                   variant="outlined"
                   style={{ width:'100%'}}
                   />
                   
               </Grid>
               <Grid item xs={12} className={classes.margiiin}>
                   <TextField
                   disabled={disableViews}
                     id="hp"
                     label="HousePhone"
                     value={housephone}
                     variant="outlined"
                     style={{ width:'100%'}}
                   />
                   </Grid>
                   <Grid item xs={12} className={classes.margiiin}>
                   <TextField
                   disabled={disableViews}
                     id="wp"
                     label="WorkplacePhone"
                     value={workplacephone}
                     variant="outlined"
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
                    variant="outlined"
                    style={{ width:'100%' , height:'20%'}}
                  />
               </Grid>
               <Button
                  className={classes.margiiin}
                  variant="contained"
                  style={{ width:'50%', display:"inline-block"}}
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
               </Grid>
            
          </form>
        </div>
      </Container>
            </div>
        </div>
        
    )
}

export default Profile;