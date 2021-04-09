import React, {useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import LoginRequest from '../../../../core/login-signup/loginRequest'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


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

  
  //const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  const [signInBtnClicked,setSignInBtnClicked ]= useState(false)
  //const [form] = Form.useForm();
  const [isLoginSucced, setIsLoginSucced]= useState("hidden")
  const history = useHistory();
  const [isLoginFailed, setIsLoginFailed]= useState("hidden")
  const [thisWillChangeWhenPassOrUsernameChanged, setChange]= useState(""); //used for hiding fail messege
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState("");



  const alert = () => {

    switch(status){
      case "1":
        return <Alert severity="success">SignIn Successful!</Alert>

      case "wrongUsernameOrPass":
        return <Alert severity="error">Wrong email or password!</Alert>

      case "0":
        return <Alert severity="error">Please fill all fields!</Alert>

      case "oops":
        return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>

      case "remove":
        return <div></div>
  }

  }


  useEffect(()=>{setStatus("remove")},[password, username])


  const onSigninSubmit = (e) => 
  {
    e.preventDefault();

    e.preventDefault();
    if((password === "") || (username === ""))
    {
      setStatus("0");
      setSignInBtnClicked(true);
    } else {



      LoginRequest({username, password})
      .then((Response)=>
      {
        console.log(Response)
        if(Response.data.success === "1")
        {
          setStatus("1");
      //    history.push("/signin");
        } 
        else if(Response.data.success === "0")
        {
          if(Response.data.error === "wrongUsernameOrPass")
          {
            setStatus("wrongUsernameOrPass");
          }
        }
      }).catch((e)=> {
            if(!e.status)
            {
              setStatus("oops");
            }
          
        });
    }

   
  };


  return (
    
      <Container component="main" maxWidth="xs" >
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
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