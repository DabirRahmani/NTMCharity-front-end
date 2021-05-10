import Button from '@material-ui/core/Button';
import React ,{ Component, useState , useEffect} from 'react';
import RequestEventDialog from './rquestEvent/requestDialog'
import Grid from '@material-ui/core/Grid';
import SingleEvent from './singleEvent'
import GetRequestedEvents from '../../../../core/eventRequests/getRequestedEvents'


const Home =()=>
{
    const [requestDialogStatus, setRequestDialogStatus] = useState(false);

    const openDialog =()=>
    {
        setRequestDialogStatus(true);
    }

    const closeDialog=()=>{
        setRequestDialogStatus(false);
    }

    const requestDialogRenderer=()=>{

        if(requestDialogStatus === true)
        return <RequestEventDialog id="redialog"  closeDialog={closeDialog}/>

    }


    return <div>


        <Grid container spacing={0}>
        <Grid item xs={1}/>

        <Grid item xs={10}>
        {requestDialogRenderer()}
        </Grid>

        <Grid item xs={1}/>
        </Grid>
        <Button onClick={openDialog}>open requests</Button>

        </div>
}

export default Home