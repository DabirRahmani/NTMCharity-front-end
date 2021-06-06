import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {useEffect, useRef, useState} from 'react'
import GetNotVerifiedUsers from '../../../../core/adminPanel/getNotVerifiedUsers'
import GetNotDeliveredProducts from '../../../../core/adminPanel/getNotDeliveredProducts'
import SignleUserItem from './singleUserItem'
import VerifyUser from "../../../../core/adminPanel/verifyUser"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';
import React from 'react';

const DeliveryRenderer=()=>
{
    const ref = useRef(null);

    const [productsList, setProductsList] = useState([]);

    const [reload, setReload] = useState(0);

    useEffect(()=>{
        GetNotDeliveredProducts()
        .then((res)=>{
            let arr2 = Object.values(res.data.donate_set)
            console.log(res.data)
            setProductsList(arr2)

        })
    
    },[reload])

    const forceReload =()=>{
        setReload(reload+1)
    }



    const CreateProductsList=()=>{
        if(productsList.length ===0)
        return <div style={{marginBottom:"16px", marginLeft:"16px"}}> there is no product to deliver</div>

        return productsList
        .map((e)=>
        <div>

        </div>)
    }

    return <div id="verifyrenderer" ref={ref}>

        <Box display="flex"  >
        <Typography  display="block" color="inherit" noWrap  style={{flexGrow: 1}}/>


          <IconButton onClick={forceReload} display="block" position="end" color="primary" aria-label="add to shopping cart" style={{marginBottom:"24px",marginRight:"12px", marginTop:"-24px"}}>
          <SyncIcon/>
          </IconButton>
        </Box>

        <div style={{marginBottom:"8px",marginLeft:"16px", fontSize:"24px"}}>list of products</div>

        <div style={{display:"inline-flex", flexWrap:"wrap"}}>
        {CreateProductsList()}

        </div>

        </div>
}

export default DeliveryRenderer