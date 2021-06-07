import React, {useState,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SignleSubItem from './subitem'
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SignleItem =(probs)=>
{
    const [status, setStatus] = useState(false)

    const [subCatList, setSubCatList]= useState([])

    const [productList, setProductList]= useState([])

    useEffect(()=>{
            setSubCatList(probs.subcatlist);
            setProductList(probs.productlist)
    })




    const CreateNextLevel=()=>{
        if(status === true)
        {
            if(subCatList.length > 0)
            {
                return subCatList.map( e=> {
                    return <SignleSubItem 
                    title={e.title} 
                    id={e.id} 
                    key={e.id +"subcat"}  
                    type="subcategory" 
                    productlist={productList.filter(ee=> ee.subcategory_id === e.id)}
                    catid={probs.id}
                    add={probs.add}
                    delete={probs.delete}
                    edit={probs.edit}
                    change={probs.change}
                    counter={probs.counter}
                    />})
            }
            else
            {
                return <div style={{marginLeft:'12px'}}> no subs </div>
            }
        }

    }

    const CreateActions =()=>{
        if(status)
        {
            return <div style={{alignSelf: 'center'}}>
                <IconButton onClick={()=>{probs.edit(probs)}}   style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <EditIcon style={{color:"#1976d2"}} fontSize="small" />
                </IconButton>

                <IconButton onClick={()=>{probs.delete(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <CancelIcon style={{color:"#e53935"}} fontSize="small"/>
                </IconButton>

                <IconButton onClick={()=>{probs.add(probs)}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
                <AddCircleIcon style={{color:"#4caf50"}} fontSize="small"/>
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
        onClick={()=>{setStatus(true)}}
        size="medium" 
        style={{ textTransform:"none", padding:'0px',paddingLeft:'-8px', background:'space', display:"-webkit-box", fontSize:"18px", fontWeight:'bold'}}>
            {probs.title}
        </Button>
    }



    return <div style={{display: 'block'}}>

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

export default SignleItem;