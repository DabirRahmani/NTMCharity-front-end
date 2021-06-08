import React ,{ Component, useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { Box, Paper } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Components } from 'antd/lib/date-picker/generatePicker';
import { styled } from '@material-ui/core/styles';
import { Feedback, Opacity } from '@material-ui/icons';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import SingleItemList from './singleItemList'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';


const SingleDeliveryItem = (probs)=> {

    const [productName, setProductsName] = useState(probs.productname)

    const [donatorMelliCode, setDonatorMelliCode] = useState(probs.melli_code)

    const [quantity, setQuantity] = useState(probs.quantity)

    const DeliveredDonate=()=>{
        probs.deliver({id:probs.id})


    }

    return <Paper
    style= {{padding:'16px', textAlign: "center" ,display:"block" , width:'30%' , 
    marginBottom:"16px" , marginInline:"10px"}}
    >
    <div>{probs.productName}</div>
    <div>{probs.donatorMelliCode}</div>
    <div>Count: {probs.quantity}</div>
    <Button
      onClick={DeliveredDonate}
      variant="contained"
      color="primary"
      size="small"
      style= {{backgroundColor: "#4caf50",paddingRight:24,paddingLeft:24,marginBottom:24, textAlign: "center"}}
      >
        Delivered
    </Button>  
    </Paper>

}

export default SingleDeliveryItem;