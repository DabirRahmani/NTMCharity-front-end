import React , {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DonateRequest from "../../../../core/donaterequest/donaterequest";
import GDonateRequestLogedin from "../../../../core/donaterequest/gdonaterequestlogedin";
import {useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { SyncProblemSharp } from "@material-ui/icons";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const GDonatelogedin = (props) =>{

    const [donatemount, setDonatemount] = useState('');
    const [status, setStatus] = useState('');

    const [state , setState] = useState(true);

    const [profilestatus, setProfilestatus] = useState(props.profilestatus)


    const onDonateSubmit=(p)=>
    {
      if(donatemount==="")
      {
        setStatus("2")
      }
      else
      {
        GDonateRequestLogedin({donatemount, state, token:localStorage.getItem("token")})
        .then((resp)=>
        {
          if(resp.data.success === "1")
          {
            props.close()
          }

        }).catch((p)=> {

            if(!p.status)
            {
              setStatus("oops");
            }
        });
      }
    };

    const CreateUnknownTick=()=>{
      if(profilestatus === "false")
      {
          return <div>NOTE: You are Donating as Guest, because your not verified</div>
      }
      else
      return <FormControlLabel
      control={
        <Checkbox
          checked={state}
          onChange={()=>{if(state===false){setState(true)}else setState(false)}}
          name="checkedF"
          //indeterminate
     />}
     label="Unknown Donator"
    />
    }


    const alert = () => {

      switch(status){

        case "2":
          return <Alert severity="error">Dont You Donate?!</Alert>
  
        case "0":
          return <Alert severity="error">Please Donate Less Than RemainedMoney!</Alert>
  
        case "oops":
          return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>
  
    }
  }

    return (
        <Dialog open={true}  aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Donate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You Can Donate How Much You Want...!
            </DialogContentText>

            {CreateUnknownTick()}

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


            <Button
            variant="contained"
            size="small" 
            style={{backgroundColor:"#93aa2a",fontFamily:"Orelega One"}}
            onClick={()=>{props.close()}}
            >
                cancel
            </Button>  

            <Button
            variant="contained"
            size="small" 
            style={{background:"#794949",fontFamily:"Orelega One"}}
            onClick={onDonateSubmit}
            >
                Donate
            </Button>  




            {alert()}
          </DialogActions>
        </Dialog>
      
    );

}

export default GDonatelogedin;