import React, {useState,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import AddIcon from '@material-ui/icons/Add';

const SignleProductItem =(probs)=>
{

    const CreateActions =()=>{
            return <div style={{alignSelf: 'center'}}>
                <IconButton  onClick={()=>{probs.edit(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <EditIcon style={{color:"#1976d2"}} fontSize="small" />
                </IconButton>

                <IconButton  onClick={()=>{probs.delete(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <CancelIcon style={{color:"#e53935"}} fontSize="small"/>
                </IconButton>

                <IconButton  onClick={()=>{probs.change(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <UnfoldMoreIcon fontSize="small"/>
                </IconButton>

            </div>
    }

    const CreateExpand=()=>{
        return <>

        </>
    }




    const CreateTitleButton =()=>{
        return <Button 
        onClick={()=>{}}
        size="medium" 
        style={{ textTransform:"none", padding:'0px',paddingLeft:'-8px', background:'space',display:"-webkit-box", minWidth:"240px", maxWidth:"150px"}}>
            {probs.title}
        </Button>
    }

    const CreateCout =()=>{
        return <div>
            <IconButton  onClick={()=>{probs.counter(probs)}} style={{verticalAlign:'-webkit-baseline-middle', marginLeft:"8px"}} size="small">
                <AddIcon style={{color:"#794949"}} fontSize="small"/>
            </IconButton>
            <div style={{display:"inline-block", verticalAlign:"-webkit-baseline-middle", minWidth:"40px", marginRight: "16px"}}>{probs.count}</div>

        </div>
    }


    return <div style={{display: 'block', marginLeft: '8px'}}>

        <div style={{display: 'inline-flex'}}>

        {CreateExpand()}

        {CreateTitleButton()}
        
        {CreateCout()}

        {CreateActions()}

        </div>

      </div>
}

export default SignleProductItem;