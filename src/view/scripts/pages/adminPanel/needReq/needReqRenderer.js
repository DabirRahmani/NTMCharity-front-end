import GetNeedRequest from "../../../../../core/adminPanel/needRequest"
import Paper from '@material-ui/core/Paper';
import { useState } from "react";
import { useEffect } from "react";
import Alert from '@material-ui/lab/Alert';
import { Divider } from "antd";

const NeedReqRenderer =()=>
{
    const [reqs, setReqs] = useState([])
    
    
    useEffect(()=>{
        GetNeedRequest()
        .then(e=>{
            if(e.data.success === "1")
            {
                if(e.data.count !== "0")
                {
                    setReqs(Object.values(e.data.needRequest_set))
                }
            }
        })
    },[])

    const CreateReqList = ()=>{

        if(reqs.length === 0)
        return <Alert>There is no need request!</Alert>

        return reqs.map(r=> <SingleNeedReq key={r.creator_username+r.title} probs={r} />)
    }


    return <div>
        <div style={{display: 'flex', flexWrap:"wrap", justifyContent:"space-around"}}>
        {CreateReqList()}
        </div>
    </div>

}


const SingleNeedReq = ({probs})=>{
    console.log(probs)

    return <Paper 
    style={{margin:"24px", maxWidth:"500px", minWidth:"500px"}}
    >
        <div style={{display: 'flex', justifyContent:"space-between", paddingRight:"32px", paddingLeft:"32px", paddingTop:"16px"}}>
            <div>Title: {probs.title}</div>
            <div>Username: {probs.creator_username}</div>
        </div>
        <div style={{paddingLeft:"32px", paddingRight:"32px", margin:"-16px"}}>
        <Divider />
        </div>
        <div
        style={{paddingRight:"32px", paddingLeft:"32px",paddingBottom:"16px"}}
        >{probs.description}</div>
    </Paper>
}

export default NeedReqRenderer