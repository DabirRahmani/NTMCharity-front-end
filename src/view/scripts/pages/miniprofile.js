import { Button, IconButton } from "@material-ui/core"
import { Avatar, Dialog } from "@material-ui/core"
import { useEffect, useState } from "react"
import BackendImageUrl from "../../../core/BacknedImageUrl"
import UserBioRequest from "../../../core/userBioRequest"
import CancelIcon from '@material-ui/icons/Cancel';

const Miniprof = (probs) => 
{
    const [state, setState] = useState(false)

    const [v, setv]= useState();

    useEffect((e) =>{
        UserBioRequest({username:probs.profileusername})
        .then(ee=>{
           // console.log(ee)
            setState(true)
            setv(ee.data)
        })
    },[])

    //console.log(probs)


    console.log(v)

    const fnamee =()=>{
        if(v.first_name !== undefined)
        if(v.first_name !== "")
        return <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{fontWeight:"bold"}}> First name: </div>
        <div> {v.first_name} </div>
        </div>
    }

    const lnamee =()=>{
        if(v.last_name !== undefined)
        if(v.last_name !== "")
        return <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{fontWeight:"bold"}}> Last name: </div>
        <div> {v.last_name} </div>
        </div>
    }


    const Render = ()=>{
        if(v!== undefined)
        if(state === true)
        {
            return <div style={{padding:"12px", width:"300px", height:"300px"}}>
             <IconButton onClick={probs.cancel} >
            <CancelIcon />
            </IconButton>

            <div style={{width:"100%", textAlign:"-webkit-center"}}>
            <Avatar style={{width:"100px", height:"100px"}} src={BackendImageUrl()+v.image_url} />


            <div style={{fontWeight: "bold"}}> {v.username} </div>

            {fnamee()}

            {lnamee()}


            </div>
            </div>
        }
    }

    return <Dialog open >

        {Render()}


    </Dialog>


}

export default Miniprof