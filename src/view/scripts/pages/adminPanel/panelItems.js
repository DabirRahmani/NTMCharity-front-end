import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { Typography } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CommentIcon from '@material-ui/icons/Comment';

export const mainListItems =(probs) => 
{

  return(
    <div>

    <ListItem button onClick={()=>probs.eventRequest()}>
    <Tooltip title={<Typography fontSize="16">Event Requests</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon style={{color:"#096dd9"}}>
      <EventBusyIcon />
      </ListItemIcon>
      </Tooltip>
    </ListItem>

    <ListItem button onClick={()=>probs.verifyUsers()}>
    <Tooltip title={<Typography fontSize="16">verify users</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon >
      <PeopleIcon style={{color:"#096dd9"}}/>

      </ListItemIcon>
      </Tooltip>
    </ListItem>

    <ListItem button onClick={()=>probs.delivery()}>
    <Tooltip title={<Typography fontSize="16">Delivery</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon>
      <CardGiftcardIcon style={{color:"#096dd9"}}/>
      </ListItemIcon>
      </Tooltip>
    </ListItem>

    <ListItem button onClick={()=>probs.storeManagement()}>
    <Tooltip title={<Typography fontSize="16">Store management</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon>
      <StoreIcon style={{color:"#096dd9"}}/>
      </ListItemIcon>
      </Tooltip>
    </ListItem>

    <ListItem button onClick={()=>probs.adminmanagement()}>
    <Tooltip title={<Typography fontSize="16">Admin management</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon>
      <VerifiedUserIcon style={{color:"#096dd9"}}/>
      </ListItemIcon>
      </Tooltip>
    </ListItem>

    <ListItem button onClick={()=>probs.needreq()}>
    <Tooltip title={<Typography fontSize="16">Need Request</Typography>} placement="right-end" fontSize="32px">
      <ListItemIcon>
      <CommentIcon style={{color:"#096dd9"}} />
      </ListItemIcon>
      </Tooltip>
    </ListItem>


    </div>
  )
}
 

