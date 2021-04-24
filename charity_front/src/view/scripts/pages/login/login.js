import React, {useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import LoginRequest from '../../../../core/login-signup/loginRequest'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import HomeIcon from '@material-ui/icons/Home';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
import Dialog from '@material-ui/core/Dialog';
import EmailIcon from '@material-ui/icons/Email';
import CancelIcon from '@material-ui/icons/Cancel'
import ForgotPasswordRequest from '../../../../core/login-signup/forgotPasswordRequest'
import ChangePasswordRequest from '../../../../core/login-signup/changePasswordRequest'


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const Login = () => {
  
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState("");
  const [disableViews, setDisableViews] = useState(false)

  const [dianogStatus, setDianogStatus] = useState(false)

  const [resetPasswordEmail,setResetPasswordEmail] = useState("")

  const [emailSentForChangePassword, setEmailSentForChangePassword] = useState(true)

  const [resetPasswordCode, setResetPasswordCode] = useState("")

  const [resetPasswordPassword, setResetPasswordPassword] = useState("")

  const [resetPasswordConfrimPassword, setResetPasswordConfrimPassword] = useState("")

  const [forgotpasswordErrMassage, setForgotpasswordErrMassage] = useState("")

  const [changePassbtnStatus,setChangePassbtnStatus] = useState("none")

  const [sendCodebtnStatus,setSendCodebtnStatus] = useState("inherit")






  const alert = () => {

    switch(status){
      case "1":
        return <Alert severity="success">SignIn Successful!</Alert>

      case "wrongUsernameOrPass":
        return <Alert severity="error">Wrong username or password!</Alert>

      case "0":
        return <Alert severity="error">Please fill all fields!</Alert>

      case "oops":
        return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>

      case "remove":
        return <div></div>

      case "passwordChanged":
        return <Alert severity="success">Password changed, you can sign in now!</Alert>
  }

  }


  useEffect(()=>{setStatus("remove")},[password, username])


  const onSigninSubmit = (e) => 
  {
    e.preventDefault();
    if((password === "") || (username === ""))
    {
      setStatus("0");
    } 
    else 
    {

      setDisableViews(true)

      LoginRequest({username, password})
      .then((Response)=>
      {
        console.log(Response)
        if(Response.data.success === "1")
        {
          setStatus("1");
          localStorage.setItem("username",Response.data.username)
          localStorage.setItem("token",Response.data.token)
          localStorage.setItem("email",Response.data.email)
          localStorage.setItem("user_type",Response.data.user_type)
        } 
        else if(Response.data.success === "0")
        {
          if(Response.data.status === "wrongUsernameOrPass")
          {
            setPassword("")
            setDisableViews(false)

            setStatus("wrongUsernameOrPass");
            

          }
        }
      }).catch((e)=> {
            if(!e.status)
            {
              setStatus("oops");
            }
            setDisableViews(false)

        });
    }
  };

  const goHome =()=>{
    history.push("/")
  }

  const signOut=()=>{
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      localStorage.removeItem("user_type")
      history.push("/signin")
  }

  const resetPassword=()=>{
    setDianogStatus(true)
  }

  const sendResetPasswordToEmailClicked=()=>{
    if(emailSentForChangePassword)
    {
      ForgotPasswordRequest({"email":resetPasswordEmail})
      .then((res)=>{
        console.log(res)
        if(res.data.success === "1")
        {
          setEmailSentForChangePassword(false)
          setForgotpasswordErrMassage("Code sent to your email")
          setSendCodebtnStatus("none")
          setChangePassbtnStatus("inherit")
        } 
        else
        if((res.data.status === "invalidEmailError") || (res.data.status === "noSuchUser"))
        {
          setForgotpasswordErrMassage("Email is not valid")
        }
      })
      .catch((e)=>{setForgotpasswordErrMassage("something went wrong")})
    } 
    else
    {
      if(resetPasswordConfrimPassword !== resetPasswordPassword)
      {
          setForgotpasswordErrMassage("passwords dont match")
          setResetPasswordConfrimPassword("")
          setResetPasswordConfrimPassword("")
      } 
      else
      {
        ChangePasswordRequest({"email":resetPasswordEmail, "pass1":resetPasswordPassword, "code":resetPasswordCode})
        .then((res)=>{
            console.log(res)

            if(res.data.success === "1")
            {
              setDianogStatus(false)
              setStatus("passwordChanged")
  
              setDianogStatus(false)
              setResetPasswordCode("")
              setResetPasswordConfrimPassword("")
              setResetPasswordEmail("")
              setResetPasswordPassword("")
              setEmailSentForChangePassword(true)
              setSendCodebtnStatus("inherit")
              setChangePassbtnStatus("none")
            } else
            {
              setForgotpasswordErrMassage("something went wrong")
            }

        })
        .catch((e)=>{
          setForgotpasswordErrMassage("something went wrong")
        })
      }
    }

  }

  const onCancelClicked=()=>{
    setDianogStatus(false)
    setResetPasswordCode("")
    setResetPasswordConfrimPassword("")
    setResetPasswordEmail("")
    setResetPasswordPassword("")
    setEmailSentForChangePassword(true)
    setSendCodebtnStatus("inherit")
    setChangePassbtnStatus("none")
  }

  if(localStorage.getItem("user_type") !== null)
  {
    console.log(localStorage.getItem("user_type"))

    return <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <h3  >you are signed in as</h3>
      <h2 style={{padding:"4px", color:"#e53935"}} >{localStorage.getItem("username")}</h2>
      <h3 style={{paddingRight:"8px"}} >you can  </h3>
      <Button onClick={goHome} color="primary" variant="contained" size="small" startIcon={<HomeIcon/>} style= {{display:"inherit",paddingRight:16,paddingLeft:16,backgroundColor:"#4caf50"}} >  back to home</Button>
      <h3 style={{padding:"8px"}} >or</h3>
      <Button onClick={signOut} color="primary" variant="contained" size="small" startIcon={<NoEncryptionIcon/>} style={{display:"inherit",paddingRight:16,paddingLeft:16,backgroundColor:"#ffc107"}}>sign out</Button>
      <h3 style={{padding:"8px"}} >to continue</h3>
      </div>
  } 
  return (
    
      <Container component="main" maxWidth="xs" >

        <Dialog  style={{backgroundColor: 'transparent', minWidth:"400px"}} open={dianogStatus}>
        <Typography style={{padding:"24px"}} alien="center">Enter your email please</Typography>
        <Typography style={{paddingLeft:"24px"}} alien="center">{forgotpasswordErrMassage}</Typography>
        <TextField
          rowsMax={1}
          size="medium"
          placeholder="email"
          style={{alignSelf:'center', width:'300px', paddingLeft:"24px", paddingRight:"24px",paddingBottom:"24px", fontSize:"32px"}}
          value={resetPasswordEmail}
          onChange={(e)=>setResetPasswordEmail(e.target.value)}
          disabled={!emailSentForChangePassword}
        />

        <TextField
          rowsMax={1}
          size="medium"
          placeholder="password"
          disabled={emailSentForChangePassword}
          style={{ alignSelf:'center', width:'300px', paddingLeft:"24px", paddingRight:"24px",paddingBottom:"24px", fontSize:"32px"}}
          value={resetPasswordPassword}
          type="password"
          onChange={(e)=>setResetPasswordPassword(e.target.value)}
        />

        <TextField
          rowsMax={1}
          type="password"
          disabled={emailSentForChangePassword}
          size="medium"
          placeholder="confirm password"
          style={{alignSelf:'center', width:'300px', paddingLeft:"24px", paddingRight:"24px",paddingBottom:"24px", fontSize:"32px"}}
          value={resetPasswordConfrimPassword}
          onChange={(e)=>setResetPasswordConfrimPassword(e.target.value)}
        />

        <TextField
          rowsMax={1}
          size="medium"
          placeholder="code"
          disabled={emailSentForChangePassword}
          style={{alignSelf:'center', width:'300px', paddingLeft:"24px", paddingRight:"24px",paddingBottom:"24px", fontSize:"32px"}}
          value={resetPasswordCode}
          onChange={(e)=>setResetPasswordCode(e.target.value)}
        />

        <div style={{display:"inherit"}}>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style= {{backgroundColor:"#ffc107", display:"inherit" ,alignSelf:'center',paddingRight:12,paddingLeft:12,margin:24, textAlign: "center", width:"180px"}}
          startIcon={<CancelIcon/>}
          onClick={onCancelClicked}>
            cancel
        </Button>


        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={sendResetPasswordToEmailClicked}
          style= {{display:sendCodebtnStatus ,alignSelf:'center',backgroundColor: "#4caf50",paddingRight:12,paddingLeft:12,margin:24, textAlign: "center", width:"180px"}}
          startIcon={<EmailIcon />}>
            send code
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={sendResetPasswordToEmailClicked}
          style= {{display:changePassbtnStatus ,alignSelf:'center',backgroundColor: "#4caf50",paddingRight:24,paddingLeft:24,margin:24, textAlign: "center", width:"220px"}}
          startIcon={<LockOutlinedIcon />}>
            Change password
        </Button>

        </div>

        </Dialog>



        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e)=>setUsername(e.target.value)}
              value={username}
              disabled={disableViews}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              variant="outlined"
              margin="normal"
              disabled={disableViews}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={disableViews}
              onClick={onSigninSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Grid container justify="flex-end">
            <Grid item xs={9}>
                <Link href="/signup"style={{marginLeft: "-2%"}} variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

              <Grid item xs={12}>
                <Button style={{textTransform:"none", display:"inherit"}} fullWidth onClick={resetPassword} color="primary">Having trouble signing in? reset password</Button>
              </Grid>
            </Grid>

            
          </form>
        </div>
        <Box mt={5}>
        </Box>
        {alert()}

      </Container>

  );
  
};

export default Login;