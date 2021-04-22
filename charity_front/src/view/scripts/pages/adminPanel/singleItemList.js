import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const SingleItemList =(probs)=>
{
    const deleteIconClicked =()=>{
        probs.deleteitem(probs.value)
    }

    return (<div id={probs.id} key={probs.key}>
        <IconButton style={{display: "inline-block"}} edge="start" onClick={deleteIconClicked}>
            <DeleteIcon />
        </IconButton>
        <Typography style={{display: "inline-block"}}>
        {probs.value}
        </Typography> 

    </div>)
}

export default SingleItemList;