import React, { useState, useEffect } from 'react';
import SignUpRequest from '../../../../core/login-signup/signupRequest';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import validator from 'validator'
import Dialog from '@material-ui/core/Dialog';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import VerifyEmailRequest from '../../../../core/login-signup/verifyEmailRequest'
import HomeIcon from '@material-ui/icons/Home';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import photo from '../img/signin.png'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
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
    }
  }));

const SignUp = () => 
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState("");
    const history = useHistory();
    const [disableViews, setDisableViews] = useState(false);
    const [cPassword, setCPassword] = useState("");
    const [type, setType] = useState("");

    const [verificationCode, setVerificationCode]= useState("");

    const [dianogStatus, setDianogStatus] = useState(false)

    const [verifyTextFieldError, setVerifyTextFieldError] = useState(false)

    const [disableVerifyTextField,setDisableVerifyTextField]= useState(true)

    useEffect(()=>{setStatus("remove")},[ username, email])

    useEffect(()=>{
      if(/\S/.test(disableVerifyTextField))
      {
        setDisableVerifyTextField(false)

      }else
      {
        setDisableVerifyTextField(true)

      }
    },[verificationCode])

    
    const onSignupSubmit=(e)=>
    {
      e.preventDefault();
      if((password === "") || (username === "") || (email === ""))
      {
        setStatus("0");
      }
      else if(password != cPassword)
      {
        setStatus("confirmPass")
        setPassword("");
        setCPassword("");
      }
      else if(password.length <6)
      {
        setStatus("checkPassword")
        setPassword("");
        setCPassword("");
      }
      else if(!validator.isEmail(email))
      {
        setStatus("checkEmail")
      }
      else if(username.length < 4)
      {
        setStatus("checkUsername")
      }
      else if(type===""){
        setStatus("invalid type")
      }
      else
      {
        setDisableViews(true);
        SignUpRequest({username,password,email,type})
        .then((res)=>
        {
          console.log(res);
            if(res.data.success === "1")
            {
              setDianogStatus(true)
            } 
            else if(res.data.success === "0")
            {
              setDisableViews(false)
              setStatus(res.data.status);
            }
        }).catch((res)=>{
          console.log(res);
          setStatus("net"); 
          setDisableViews(false);
        })
        
      }

    }

    const classes = useStyles();
    const alert = () => {
         
        switch(status)
        {
            case "1":
                return <Alert severity="success" style={{fontFamily:"Mate SC"}}>Signup Successful! you can sign in now</Alert>
            case "0":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Please fill all fields!</Alert>

            case "emailError":
                return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Email already exists!</Alert>

            case "emailUsernameError":
                 return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Email and Username already exist!</Alert>

            case "usernameError":
                  return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Username already exists!</Alert>

            case "net":
            return <Alert severity="error" style={{fontFamily:"Mate SC"}}>something went wrong, Check your connection and try again!</Alert>

            case "checkPassword":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Password must be at least 6 characters!</Alert>

            case "checkEmail":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Please enter a valid email!</Alert>

            case "checkUsername":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Username must be at least 4 characters!</Alert>
            
            case "remove":
              return <div></div>

            case "confirmPass":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Paswwords don't match</Alert>

            case "invalid type":
              return <Alert severity="error" style={{fontFamily:"Mate SC"}}>Please select your type</Alert>
        }
    }

    const verifyEmailClicked =() => {

      VerifyEmailRequest({email,"code":verificationCode})
      .then((res)=>{
        if(res.data.success=== "1")
        {
            setDianogStatus(false)
            setStatus(res.data.success)
        }
        else
        {
          setVerificationCode("")
          setVerifyTextFieldError(true)
        }
      })

    }

    const goHome =()=>{
      history.push("/")
    }

    const signOut=()=>{
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("user_type")
        history.push("/signup")
    }

    if(localStorage.getItem("user_type") !== null)
    {

      return <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <h3  >you are signed in as</h3>
        <h2 style={{padding:"4px", color:"#e53935"}} >{localStorage.getItem("username")}</h2>
        <h3 style={{paddingRight:"8px"}} >you can  </h3>
        <Button onClick={goHome} color="primary" variant="contained" size="small" startIcon={<HomeIcon/>} style= {{display:"inherit",paddingRight:16,paddingLeft:16,backgroundColor:"#4caf50",fontFamily:"Orelega One"}} >  back to home</Button>
        <h3 style={{padding:"8px"}} >or</h3>
        <Button onClick={signOut} color="primary" variant="contained" size="small" startIcon={<NoEncryptionIcon/>} style={{display:"inherit",paddingRight:16,paddingLeft:16,backgroundColor:"#ffc107",fontFamily:"Orelega One"}}>sign out</Button>
        <h3 style={{padding:"8px"}} >to continue</h3>
        </div>
    } 
    else
    return( 
      <div>
        <div>
            <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap", marginBottom: "1%",marginTop: "1%"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px",fontFamily:"Dancing Script"}}>
                NTM CHARITY!
                </Typography>
                </Toolbar>
             </AppBar>
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
        
        </div>
     <Container component="main" maxWidth="xs" style={{backgroundColor:"whitesmoke"}}>
        <Dialog  style={{backgroundColor: 'transparent', minWidth:"400px"}} open={dianogStatus}>
        <Typography style={{padding:"24px"}} alien="center">an email with verification code sent to {email}</Typography>
        <TextField
          rowsMax={1}
          size="medium"
          placeholder="code"
          style={{disabled:{disableVerifyTextField},alignSelf:'center', width:'80px', paddingLeft:"24px", paddingRight:"24px",paddingBottom:"24px", fontSize:"32px"}}
          value={verificationCode}
          error={verifyTextFieldError}
          onChange={(e)=>setVerificationCode(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={verifyEmailClicked}
          style= {{alignSelf:'center',backgroundColor: "#4caf50",paddingRight:24,paddingLeft:24,marginBottom:24, textAlign: "center", width:"90px",fontFamily:"Orelega One"}}
          startIcon={<VerifiedUserIcon />}>
            verify
          </Button>
        </Dialog>
        
        <div className={classes.paper} style={{paddingBottom:"10%", marginTop:"6%"}}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontFamily:"Sigmar One"}}>
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>  
                <TextField
                  disabled={disableViews}
                  onChange={(e)=>setUsername(e.target.value)}
                  value={username}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="user"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={disableViews}
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={disableViews}
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={disableViews}
                  onChange={(e)=>setCPassword(e.target.value)}
                  value={cPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                />
              </Grid>
              <Grid item xs={12} >
                 <FormControl fullWidth variant="outlined" className={classes.formControl} disabled={disableViews}>
                   <InputLabel  id="demo-simple-select-outlined-label">Sign up as</InputLabel>
                   <Select
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     value={type}
                     onChange={(e) => setType(e.target.value)}
                     label="Sign up as :"
                   >
                     <MenuItem value={3}>Donator</MenuItem>
                     <MenuItem value={4}>Needy</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
            </Grid>
            <Button
              disabled={disableViews}
              onClick={onSignupSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{fontFamily:"Orelega One"}}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs={9}>
                <Link href="/signin"style={{marginLeft: "-2%",fontFamily:"Orelega One"}} variant="body2" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
        {alert()}
        
      </Container>
      </div>
    )
    }
export default SignUp
