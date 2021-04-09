import React, { useState, useEffect } from 'react';
import SignUpRequest from '../../../../core/login-signup/signupRequest';
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
import {useHistory} from 'react-router-dom';
import validator from 'validator'



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
  }));

const SignUp = () => 
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState("");
    const history = useHistory();
    const [disableViews, setDisableViews] = useState(false);

    useEffect(()=>{setStatus("remove")},[ username, email])

    
    const onSignupSubmit=(e)=>
    {
      e.preventDefault();
      if((password === "") || (username === "") || (email === ""))
      {
        setStatus("0");
      }
      else if(password.length <6)
      {
        setStatus("checkPassword")
        setPassword("");
      }
      else if(!validator.isEmail(email))
      {
        setStatus("checkEmail")
      }
      else if(username.length < 4)
      {
        setStatus("checkUsername")
      }
      else
      {
        setDisableViews(true);
        SignUpRequest({username,password,email})
        .then((res)=>
        {
            if(res.data.success === "1")
            {
              setStatus(res.data.success)
              history.push("/signup");
            } 
            else if(res.data.success === "0")
            {
              setDisableViews(false)
              setStatus(res.data.status);
            }
        //    setDisableViews(false);
        }).catch(()=>{setStatus("net"); setDisableViews(false);})
        
      }

    }

    const classes = useStyles();
    const alert = () => {
         
        switch(status)
        {
            case "1":
                return <Alert severity="success">Signup Successful!</Alert>
            case "0":
              return <Alert severity="error">Please fill all fields!</Alert>

            case "emailError":
                return <Alert severity="error">Email already exists!</Alert>

            case "emailUsernameError":
                 return <Alert severity="error">Email and Username already exist!</Alert>

            case "usernameError":
                  return <Alert severity="error">Username already exists!</Alert>

            case "net":
            return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>

            case "checkPassword":
              return <Alert severity="error">Password must be at least 6 characters!</Alert>

            case "checkEmail":
              return <Alert severity="error">Pleass enter a valid email!</Alert>

            case "checkUsername":
              return <Alert severity="error">User Name must be at least 4 characters!</Alert>
            
            case "remove":
              return <div></div>
        }
    }

    return( 
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
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
                  label="User Name"
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
            </Grid>
            <Button
              disabled={disableViews}
              onClick={onSignupSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs={9}>
                <Link href="/signin"style={{marginLeft: "-2%"}} variant="body2" >
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
    )
    }
export default SignUp
