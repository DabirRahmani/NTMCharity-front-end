import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProfileRequest from '../../../../core/profile/profilepagerequest';
import EditProfileRequest from '../../../../core/profile/editprofilerequest';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import photo from '../img/signin.png'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import UploadProflieImage from './uploadProfileImage'
import UploadImageRequest from '../../../../core/uploadImage';



const EditProfile =() =>
{
    const history = useHistory();
    const [status , setStatus] = useState('');
    const [usernamee , setUsernamee] = useState('');
    const [firstname , setFirstname] = useState('');
    const [lastname , setLastname] = useState('');
    const [email , setEmail] = useState('');
    const [usertype , setUsertype] = useState('');
    const [codemelli , setCodemelli] = useState('');
    const [job , setJob] = useState('');
    const [address , setAddress] = useState('');
    const [mobilenumber , setMobilenumber] = useState('');
    const [housephone , setHousephone] = useState('');
    const [disableViews, setDisableViews] = useState(false);
    const [workplacephone , setWorkplacephone] = useState('');
    const [gender , setGender] = useState('');
    const [married , setMarreid] = useState('');
    const [birthdate , setBirthdate] = useState('');
    const [isprofilecompleted , setIsprofilecompleted] = useState('');
    const [ismobilevarified , setIsmobilevarified] = useState('');
    const [isemailvarified , setIsemailvarified] = useState('');

    const [imageurl, setImageUrl]= useState('');

    const [submitImage, setsubmitImage]= useState(false);


    

    useEffect(()=>{

    ProfileRequest({Username : localStorage.getItem("username")})
    .then((res)=>
    {
        if(res.data.success === "1"){
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
            setImageUrl(res.data.image_url)
        }
        else if(res.data.success === "0")
        {
            if(res.data.error === "notLoggedIn")
            {
                setStatus("notLoggedIn");

            }
            else if(res.data.error === "differentUsername")
            {
                setStatus("differentUsername");
                
            }
            else if(res.data.error === "requiredParams")
            {
                setStatus("requiredParams");

            }
            else if(res.data.error === "DoesNotExist")
            {
                setStatus("DoesNotExist");
                
            }
        }
    })
  },[])


    const onEditprofileSubmit=() =>{
      setsubmitImage(true)
    }
    
    const EditprofileSubmit=(src)=>
    {
        if((codemelli==="") || (firstname==="") || (lastname==="") )
        {
            setStatus("0");
        }
        else if(codemelli.length!="10")
        {
          setStatus("5");
        }
        else
        {
            EditProfileRequest({usernamee ,firstname , lastname ,usertype, codemelli 
                , mobilenumber , gender,src })
                .then((resp)=>
                {
                    if(resp.data.success === "1")
                    {
                        setStatus("1");
                        goprofile();
                    }
                    else if(resp.data.success === "0")
                    {
                        setStatus("0");
                    }
                }).catch((p)=> {

                    if(!p.status)
                    {
                      setStatus("oops");
                    }
                });

        }

    };

    const goprofile =()=>{
      history.push("/profile")
    }


    const alert = () => {

        switch(status){
          case "1":
            return <Alert severity="success">Profile Edited Successfully!</Alert>
    
          case "0":
            return <Alert severity="error">Please fill all necessary fields!</Alert>
    
          case "5":
            return <Alert severity="error">Please enter a correct mellicode!</Alert>
    
          case "oops":
            return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>
    
      }
    }

    const handleImage=(probs)=>{
      if(probs.changed === true)
      {
        UploadImageRequest({state:probs.state})
        .then((res)=>{
            var src = res.data.image_url;
            EditprofileSubmit(src)
        })
      }
      else
      {
        EditprofileSubmit(probs.src)
      }
      setsubmitImage(false)

      
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
        fontFamily:"Orelega One",
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      formControl: {
        width: '100%',
      },
      margiiin:{
        margin: '12px',
      }
    }));
    const classes = useStyles();

    if(localStorage.getItem("token")=== null)
    {
      return <div style={{padding:"24px"}}>404 page not found</div>
    }
    return <div >
      <div>
                
               

          <img src={photo} 
            style={{
             position:"fixed",
             width:"100%",
             height:"-webkit-fill-available",
             objectFit:"cover",
             zIndex:"-1"
             }}
            />
             <AppBar position="static" style={{backgroundColor:"#78a6c1"}}>
                 <Toolbar style={{whiteSpace: "nowrap", marginBottom: "1%",marginTop: "1%"}}>
                     <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                     </AllInclusiveIcon>
                    <Typography style={{fontSize:"30px",fontFamily:"Dancing Script",marginLeft:"3vh"}}>
                    NTM CHARITY!
                    </Typography>
                    </Toolbar>
                 </AppBar>
                </div>
                <div style={{display:"-webkit-flex", justifyContent:"space-between"}}>

<Button
      variant="contained"
      style={{display:"inline-block",fontFamily:"Orelega One"}}
      onClick={onEditprofileSubmit}
      style= {{
        backgroundColor:"#688494",
      paddingRight:8,
      paddingLeft:8,
      whiteSpace: "nowrap",
      textAlign: "center"}}   
      variant="contained"
      color="primary"       
      startIcon={<CheckCircleOutlineIcon />}
      >
        submit
   </Button>
  
<Button
      variant="contained"
      style={{display:"inline-block" , fontFamily:"Orelega One"}}
      onClick={goprofile}
      //size="small"
      style= {{
        backgroundColor:"#688494",
      paddingRight:8,
      paddingLeft:8,
      whiteSpace: "nowrap",
      textAlign: "center"}}   
      //fullWidth
      variant="contained"
      color="primary"       
      startIcon={<CancelIcon />}
      >
        Back to Profile
   </Button>




</div>

          <Container component="main" maxWidth="xs" style={{backgroundColor:"whitesmoke", paddingTop:"16px",marginTop:"20px"}}>
          <div style={{width:'100%',textAlign:'-webkit-center'}}>

          <UploadProflieImage image={imageurl} onsubmit={submitImage} handleImage={handleImage}  />
          </div>

          <Typography component="h2" variant="h5" style={{fontSize:"30px", fontFamily:"Mate SC", textAlign:'-webkit-center'}}>
            {usernamee}
          </Typography>



             
          <form className={classes.form} noValidate>
            <Grid container>
               <Grid item xs={12} className={classes.margiiin}>
                 <TextField
                 disabled={disableViews}
                 id="fn"
                 label="FirstName"
                 value={firstname}
                 onChange={(e)=>setFirstname(e.target.value)}
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
                 onChange={(e)=>setLastname(e.target.value)}
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
                    onChange={(e) => setGender(e.target.value)}
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
                 onChange={(e) => setCodemelli(e.target.value)}
                 variant="filled"
                 required
                 style={{ width:'100%'}}
                 />
                 
               </Grid>


               <Grid item xs={12} className={classes.margiiin}>
               {alert()}
                 
               </Grid>



               </Grid>
            
          </form>
      </Container>
      <div style={{padding:"16px"}}></div>

        </div>

    };

export default EditProfile;