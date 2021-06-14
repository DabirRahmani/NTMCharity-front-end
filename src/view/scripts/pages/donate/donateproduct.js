import React , {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DonateRequest from "../../../../core/donaterequest/donaterequest";
import GDonateRequest from "../../../../core/donaterequest/gdonaterequest";
import DonateProducrRequest from "../../../../core/donaterequest/donateproductrequest";
import {useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { SyncProblemSharp } from "@material-ui/icons";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { GetProductList } from "../../../../core/adminPanel/storeManagement";

const DonateProduct = (props) =>{

    const [number, setNumber] = useState('');
    const [product, setProduct] = useState('');
    const [id, setId] = useState(props.id);
    const [status, setStatus] = useState('');
    const [open, setOpen] = React.useState(true);
    const history = useHistory();

    const [arr, setArr]= useState([])

    useEffect(()=>{
      GetProductList()
      .then(e=>{
        setArr(Object.values(e.data.product_set))
      })
    },[])

    
    const onDonateSubmit=(p)=>
    {
      if(number==="")
      {
        setStatus("2")
      }
      else
      {
          if(product==="")
          {
              setStatus("3")
          }
          else
          {
            DonateProducrRequest({token:localStorage.getItem("token"),product,number})
            .then((resp)=>
            {
              if(resp.data.success === "1")
              {
                setStatus("1");
                props.close()
                props.number(number)
                props.product(product)
              }
    
            }).catch((p)=> {
    
                if(!p.status)
                {
                  setStatus("oops");
                }
            });
          }
        

      }

    };


    const alert = () => {

      switch(status){
        case "1":
          return <Alert severity="success">Profile Edited Successfully!</Alert>

        case "2":
          return <Alert severity="error">Set a number?!</Alert>
        case "3":
          return <Alert severity="error">Choose a Product!</Alert>
  
        case "0":
          return <Alert severity="error">Please Donate Less Than RemainedMoney!</Alert>
  
        case "oops":
          return <Alert severity="error">something went wrong, Check your connection and try again!</Alert>
  
    }
  }

  const CreateMenuItems = ()=>{
    return arr.map(e=> <MenuItem value={e.id}>{e.title}</MenuItem> )
  }

    return (
        <Dialog open={open}  aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Donate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You Can Donate Any Product You Want...!
            </DialogContentText>
            <Grid >
                <FormControl variant="outlined" style={{ width:'100%'} }>
                  <InputLabel  id="demo-simple-select-outlined-label">Product</InputLabel>
                  <Select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    label="Product"
                  >
                    {CreateMenuItems()}

                   </Select>
                 </FormControl>
               </Grid>
            <TextField
              autoFocus
              onChange={(e)=>{setNumber(e.target.value)}}
              margin="dense"
              id="name"
              label="Number of Product"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{props.close()}} style={{
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
      
    );

}

export default DonateProduct;