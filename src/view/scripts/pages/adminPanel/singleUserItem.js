import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const SignleUserItem=(probs)=>{

    return<Paper style={{maxWidth:"250px",minWidth:"250px",padding:"8px",marginLeft:"16px",marginRight:"16px", marginBottom:"16px"}}>
    <div>
        username: {probs.username}
    </div>
    <div>
        name: {probs.firstname} {probs.lastname}
    </div>
    <div>
        email: {probs.email}
    </div>
    <div>
        mellicode: {probs.mellicode}
    </div>
    <div>
        phone: {probs.phone}
    </div>
    <div>
        gender: {probs.gender}
    </div>

    <div style={{textAlign: '-webkit-right'}}>
    <IconButton  onClick={()=>{probs.action({id:probs.id, action:"1"})}}>
    <CheckCircleIcon style={{color:"#4caf50"}} />
    </IconButton >
    <IconButton onClick={()=>{probs.action({id:probs.id, action:"0"})}}>
    <CancelIcon  style={{color:"#e53935"}}/>
    </IconButton>
    </div>
    </Paper>
}

export default SignleUserItem