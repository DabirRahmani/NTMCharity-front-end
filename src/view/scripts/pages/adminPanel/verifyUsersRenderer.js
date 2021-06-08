import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {useEffect, useRef, useState} from 'react'
import GetNotVerifiedUsers from '../../../../core/adminPanel/getNotVerifiedUsers'
import SignleUserItem from './singleUserItem'
import VerifyUser from "../../../../core/adminPanel/verifyUser"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';
import React from 'react';

const VerifyUsersRenderer=()=>
{
    const ref = useRef(null);

    const [usersNeedyList, setUsersNeedyList] = useState([]);


    const [usersDonatorList, setUsersDonatorList] = useState([]);

    const [reload, setReload] = useState(0);

    useEffect(()=>{

        GetNotVerifiedUsers({admintoken:localStorage.getItem("token")})
        .then((res)=>{
            
            if(res.data.donator_set !== undefined)
            {
                let arr = Object.values(res.data.donator_set)
                setUsersDonatorList(arr)
            }

            if(res.data.needy_set !== undefined)
            {
            let arr2 = Object.values(res.data.needy_set)
            setUsersNeedyList(arr2)
            }


        })
    
    },[reload])

    const forceReload =()=>{
        setReload(reload+1)
    }


    const CreateNeedyList=()=>{
        if(usersNeedyList.length ===0)
        return <div style={{marginBottom:"16px", marginLeft:"16px"}}> there is no needy to verify</div>

        return usersNeedyList
        .map((e)=> <SignleUserItem 
        username={e.username} 
        firstname={e.first_name} 
        lastname={e.last_name} 
        email={e.email}
        mellicode={e.melli_code}
        phone={e.moblie_number}
        gender={e.gender}
        action={action}
        id={e.id}
        key= {e.username+"needy"}
        />)
    }

    const CreateDonatorList=()=>{
        if(usersDonatorList.length ===0)
        return <div style={{marginBottom:"16px",marginLeft:"16px"}}> there is no Donator to verify</div>

        return usersDonatorList
        .map((e)=> <SignleUserItem 
        username={e.username} 
        firstname={e.first_name} 
        lastname={e.last_name} 
        email={e.email}
        mellicode={e.melli_code}
        phone={e.moblie_number}
        gender={e.gender}
        action={action}
        id={e.id}
        key= {e.username+"donator"}
        />)
    }

    const action =(probs)=>{
        VerifyUser({id:probs.id,action:probs.action,admintoken:localStorage.getItem("token") })
        .then((res)=>{
            if(res.data.success === "1")
            {
                setUsersDonatorList(usersDonatorList.filter(e=> e.id !== probs.id))
                setUsersNeedyList(usersNeedyList.filter(e=> e.id !== probs.id))
            }
        })
    }

    return <div id="verifyrenderer" ref={ref}>

        <Box display="flex"  >
        <Typography  display="block" color="inherit" noWrap  style={{flexGrow: 1}}/>


          <IconButton onClick={forceReload} display="block" position="end" color="primary" aria-label="add to shopping cart" style={{marginBottom:"24px",marginRight:"12px", marginTop:"-24px"}}>
          <SyncIcon/>
          </IconButton>
        </Box>

        <div style={{marginBottom:"8px",marginLeft:"16px", fontSize:"24px"}}>list of needies</div>

        <div style={{display:"inline-flex", flexWrap:"wrap"}}>
        {CreateNeedyList()}

        </div>

        <div style={{marginBottom:"8px",marginLeft:"16px", fontSize:"24px"}}>list of donators</div>

        <div  style={{display:"inline-flex", flexWrap:"wrap"}}>
        {CreateDonatorList()}
        </div>

        </div>
}

export default VerifyUsersRenderer