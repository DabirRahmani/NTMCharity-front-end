import React, { useState } from 'react';
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

    
    const onSignupSubmit=(e)=>
    {
      e.preventDefault();
      if((password === "") || (username === "") || (email === ""))
      {
        setStatus("0");
      }
      else
      {
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
              setStatus(res.data.status);
            }
        }).catch(()=>{setStatus("net")})
        
      }

    }

    const classes = useStyles();
    const alert = () => {
         
        switch(status){
            case "1":
                return <Alert severity="success">Signup Successful!</Alert>
            case "0":
              return <Alert severity="error">Please fill all filds!</Alert>

            case "emailError":
                return <Alert severity="error">Email is Used!</Alert>

            case "emailUsernameError":
                 return <Alert severity="error">Email and Username are used!</Alert>

            case "usernameError":
                  return <Alert severity="error">Username is used!</Alert>

            case "net":
            return <Alert severity="error">network error!</Alert>

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
