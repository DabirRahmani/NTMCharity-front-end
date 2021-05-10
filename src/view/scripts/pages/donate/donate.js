import React , {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DonateRequest from "../../../../core/donaterequest/donaterequest";
import {useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const Donate = (props) =>{
    //props.id
    //props.remained
    const history = useHistory();
    const [donatemount, setDonatemount] = useState('');
    const [id, setId] = useState(props.id);
    const [status, setStatus] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [remained, setRemained] = useState(props.remained);
    const [open, setOpen] = React.useState(false);
    

    const onDonateSubmit=(p)=>
    {
      if(donatemount>remained)
      {
        setStatus("0");
      }
      else if(donatemount==="")
      {
        setStatus("2")
      }
      else
      {
        DonateRequest(id,token,donatemount)
        .then((resp)=>
        {
          if(resp.target.success === "1")
          {
            setStatus("1");
            //(gotoevent(id));
            setOpen(false);
          }

        }).catch((p)=> {

          console.log(p);
            if(!p.status)
            {
              setStatus("oops");
            }
            //setDisableViews(false)
        });

      }

    };

    //const gotoevent =() =>{
    //  history.push("./event")
    //}

    const alert = () => {

      switch(status){
        case "1":
          return <Alert severity="success">Profile Edited Successfully!</Alert>

        case "2":
          return <Alert severity="error">Dont You Donate?!</Alert>
  
        case "0":
          return <Alert severity="error">Please Donate Less Than RemainedMoney!</Alert>
  
        case "oops":
          return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>
  
    }
  }

    const handleClickOpen = () => {
      setOpen(true);
    };
   
    const handleClose = () => {
      setOpen(false);
    };
   
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Donate!
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Donate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              RemainedMoney: {remained}
            </DialogContentText>
            <TextField
              autoFocus
              onChange={(e)=>{setDonatemount(e.target.value)}}
              margin="dense"
              id="name"
              label="Donate Mount"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{
                backgroundColor: "#ffc107"
            }}>
              Cancel
            </Button>
            <Button onClick={onDonateSubmit} style={{
                backgroundColor: "#4caf50"
            }}>
              Donate
            </Button>
            {alert()}
          </DialogActions>
        </Dialog>
      </div>
      
    );

}

export default Donate;