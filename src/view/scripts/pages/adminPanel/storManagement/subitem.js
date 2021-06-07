import React, {useState,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SignleProductItem from './productitem'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const SignleSubItem =(probs)=>
{
    const [status, setStatus] = useState(false)

    const [productList, setProductList]= useState([])

    useEffect(()=>{
            setProductList(probs.productlist)
    })


    const CreateNextLevel=()=>
    {
        if(status === true)
        {
            if(productList.length > 0)
            {
                return productList.map( e=> {
                    return <SignleProductItem 
                    title={e.title} 
                    type="product" 
                    id={e.id}
                    key={e.id +"product"}
                    subcatid={probs.id}
                    count={e.quantity}
                    counter={probs.counter}
                    change={probs.change}
                    add={probs.add}
                    delete={probs.delete}
    
                    edit={probs.edit} />})
            }
            else
            {
                return <div style={{marginLeft:'12px'}}> no products </div>
            }
        }
    }


    const CreateActions =()=>{
        if(status)
        {
            return <div style={{alignSelf: 'center'}}>
                <IconButton  onClick={()=>{probs.edit(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <EditIcon style={{color:"#1976d2"}} fontSize="small" />
                </IconButton>

                <IconButton  onClick={()=>{probs.delete(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <CancelIcon style={{color:"#e53935"}} fontSize="small"/>
                </IconButton>

                <IconButton  onClick={()=>{probs.add(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <AddCircleIcon style={{color:"#4caf50"}} fontSize="small"/>
                </IconButton>

                <IconButton  onClick={()=>{probs.change(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <UnfoldMoreIcon fontSize="small"/>
                </IconButton>
            </div>
        }
    }

    const CreateExpand=()=>{
        return <>
        {!status ? 
        <IconButton onClick={()=>setStatus(true)} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
        <ChevronRightIcon fontSize="small" />
        </IconButton>
         : 
        <IconButton onClick={()=>setStatus(false)} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
        <ExpandMore style={{color:"#4caf50"}} fontSize="small" />
        </IconButton>
        }
        </>
    }

    const CreateTitleButton =()=>{
        return <Button 
        onClick={()=>{setStatus(true); probs.focus({type:"sub",id:probs.id })}}
        size="medium" 

        style={{ textTransform:"none", padding:'0px',paddingLeft:'-8px', background:'space',display:"-webkit-box",fontWeight:'bold'}}>
            {probs.title}
        </Button>
    }


    return <div style={{display: 'block', marginTop:'4px'}}>

        <div style={{display: 'inline-flex'}}>

        {CreateExpand()}

        {CreateTitleButton()}
        
        {CreateActions()}

        </div>


        <div style={{marginLeft:'24px'}}>
            {CreateNextLevel()}
        </div>

      </div>
}

export default SignleSubItem;