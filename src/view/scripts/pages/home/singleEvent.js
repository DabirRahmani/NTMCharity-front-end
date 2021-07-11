import React ,{ Component, useState , useEffect} from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListIcon from '@material-ui/icons/List';
import Donate from '../donate/donate'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BackendImageUrl from '../../../../core/BacknedImageUrl';

const SingleEvent = (probs)=> {

    const [inModify, setInModify]= useState("none")

    const [onCacellModify, setOnCacellModify] = useState("block")

    const [imageStatus, setImageStatus] = useState("none")

    const [openDialog, setOpenDialog] = useState(false)

    const [donatedmoney, setdonatedmoney]= useState(probs.donatedmoney)

    const [profilestatus,setprofilestatus]= useState("false")

    useEffect(()=>{
      if(probs.profilestatus !== false)
      {
        setprofilestatus(true)

      }
      else setprofilestatus(false)


    },[probs.profilestatus,probs])



    const ListOfNeedsRenderer=()=>
    {
      if(probs.listofneeds !== undefined)
      {
        if(probs.listofneeds !== null)
        {
          
          return Object.values(probs.listofneeds).map(e=> { if(e !== "") return <div  key={e+"item"} id={e+"item"}>{e}</div>})
        }
      }
    }

    const ListOfneedsText=()=>{
      if(probs.listofneeds !== undefined)
      if(probs.listofneeds !== null)
      if(      Object.values(probs.listofneeds).length >0      )
      return <div style={{display: 'block', marginLeft:"8px"}}>
      <ListIcon style={{display: 'inline-block', marginTop:"12px",verticalAlign:"bottom"}}/>
      <Typography style={{display: 'inline-block',fontFamily:"Mate SC"}} >List of needs</Typography>
      </div>
    }

    useEffect(()=>{
      if(/\S/.test(probs.imageurl))
      {
        setImageStatus("block")
      }
    },[])


    const imageDivider =()=>{
      if(/\S/.test(probs.imageurl))
        return <Divider style={{margin:10, border:"1px solid", background:"#000", opacity:0.1}} orientation="vertical" flexItem />

    }

    const renderDonateDialog=()=>{
      if(openDialog === true)
      {
        return <Donate donatemount={decRemained} close={closeDialog} id={probs.eventid} remained={probs.moneytarget - probs.donatedmoney} />
      }
    }

    const decRemained =(probs)=>{
      setdonatedmoney(+donatedmoney + +probs)
    }

    const closeDialog=()=>{
      setOpenDialog(false)
    }

    const createDonateButton=()=>{

      if(profilestatus === false)
      {
        return <div style={{fontFamily:"Orelega One"}}> You are not verified yet! </div>
      }

      if(localStorage.getItem("token") === null )
      return <div style={{fontFamily:"Orelega One"}}> Sign in to donate! </div>
      
      if(localStorage.getItem("user_type")=== "4")
      return <div style={{fontFamily:"Orelega One"}}> Cant donate as needy! </div>


      return <Button 
      onClick={()=>{setOpenDialog(true)}}
      variant="contained"
      size="small"
      style={{background:"#794949",fontFamily:"Orelega One"}}>Donate 
      </Button>

    }

    const CreateImage=() =>{
      if(probs.imageurl === undefined || probs.imageurl === null || probs.imageurl === "")
      {
        return <div></div>
      }
      return <div  style={{alignItems: 'center'}} >
      <img style={{maxWidth: "300px",maxHeight:"200px"}}  src={BackendImageUrl()+probs.imageurl} />
      </div>
    }


    return(

      <div id={probs.eventid} key={probs.eventid} style={{paddingBottom:16}}>

        {renderDonateDialog()}
  
        <Accordion >
  
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
  
            <div style={{flexBasis: '33.33%',marginRight: '30px'}} >
              <Typography style={{fontSize:15, display:onCacellModify,fontFamily:"Orelega One"}} >{probs.title}</Typography>
              <div style={{display: inModify, width:'100%'}}></div>
            </div>

            <div style={{flexBasis: '33.33%',marginRight: '30px'}} >
              <Typography style={{fontSize:15, display:onCacellModify,fontFamily:"Orelega One"}} >${probs.moneytarget-donatedmoney}</Typography>
              <div style={{display: inModify, width:'100%'}}></div>
            </div>

            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5,fontFamily:"Orelega One"}} >#{probs.eventid}</Typography>
            </div>
            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5,fontFamily:"Orelega One"}} >{probs.username}</Typography>
            </div>
            <div style={{flexBasis: '33.33%'}} >
              <Typography style={{fontSize:15, color:"#000000" ,opacity: 0.5,fontFamily:"Orelega One"}} >{probs.date}</Typography>
            </div>
  
          </AccordionSummary>
  
          <AccordionDetails style={{alignItems: 'center'}}>
            <div style={{flex: '70%'}}  >
                <Typography  style={{ display: onCacellModify,fontFamily:"Orelega One"}}>
                  {probs.description}
                </Typography>


              {ListOfneedsText()}

                <div style={{marginLeft:"16px",fontFamily:"Orelega One"}}>
                {ListOfNeedsRenderer()}
                </div>

            </div>
  
            <div style={{display:imageStatus}}>

            {imageDivider()}


            {CreateImage()}
  
            </div>

          </AccordionDetails>
          
          <Divider />
  
          <AccordionActions>
            {createDonateButton()}

          </AccordionActions>
  
        </Accordion>
  
      </div>
  
    );
  }
  
  export default SingleEvent;