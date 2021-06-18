import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, FormControl, InputLabel, LinearProgress, MenuItem, Paper, Select, Snackbar } from '@material-ui/core';
import GetVerifiedDonatorSet from '../../../../../core/adminPanel/adminmanager/getAllUsers';
import GetAdminSet from '../../../../../core/adminPanel/adminmanager/getAllAdmins';
import postPromote from '../../../../../core/adminPanel/adminmanager/promote';
import postDemote from '../../../../../core/adminPanel/adminmanager/demote';
import MuiAlert from '@material-ui/lab/Alert';
import PostEmailRequest from './../../../../../core/sendEmail/sedEmailRequest'



const AdminManagementRenderer =()=>
{
  const [users, setUsers] = useState([])

  const [user, setUser] = useState("")

  const [admins, setAdmins] = useState([])

  const [admin, setAdmin] = useState("")

  const [load, setLoad] = useState(false);

  const [dialogStatus, setDialogStatus] = useState(false);

  const [dialogText, setDialogText] = useState("")

  const [realod, setRealod] = useState(0)

  const [userSelectErr, setuserSelectErr]= useState(false)

  const [adminSelectErr, setAdminSelectErr]= useState(false)

  useEffect(() => {
    if(user !== "")
    setuserSelectErr(false)
  },[user])

  useEffect(() => {
    if(admin !== "")
    setAdminSelectErr(false)
  },[admin])


  useEffect(()=>{  
    GetVerifiedDonatorSet({admintoken:localStorage.getItem("token")})
    .then(e=> {
      setUsers(Object.values(e.data))
    })

    GetAdminSet({admintoken:localStorage.getItem("token")})
    .then(e=>{
      setAdmins(Object.values(e.data))
    })
  },[realod])


  const Demote =()=>{

    if(admin === "")
    {
      setAdminSelectErr(true)
    }
    else
    {

    setLoad(true)
    setDialogStatus(true)

    postDemote({admintoken:localStorage.getItem("token"), user:admins.filter(e=>e.id=== admin)[0].username})
    .then(e=>{
      if(e.data.success === "1")
      {
        setDialogText("admin "+ admins.filter(f=> f.id === admin)[0].username+ " demoted to donater");

        var un = admins.filter(f=> f.id === admin)[0].username

        var em = admins.filter(f=> f.id === admin)[0].email

        var message = "Hi, Dear "+un+" your account in NTM CHARITY has been demoted to donater!\nThanks!"

        var subject = "Account Demoted"

        PostEmailRequest({"email":em,subject:subject,message:message})
        .then((e)=>{console.log(e)})

        setRealod(realod+1);
        setAdmin("")
        setUser("")

        setLoad(false);

      }
      else
      {
        setDialogText("sth went wrong");
        setLoad(false);
      }
    })
    .catch(e=>{
      setDialogText("sth went wrong");
      setLoad(false);
    })
  }
  }

  const Promote =()=>{

    if(user === "")
    {
      setuserSelectErr(true)
    }
    else
    {

      
    setDialogStatus(true)
    setLoad(true)

    postPromote({admintoken:localStorage.getItem("token"), user:users.filter(e=>e.id=== user)[0].username})
    .then(e=>{
      if(e.data.success === "1")
      {
        setDialogText("user "+ users.filter(f=> f.id === user)[0].username+ " promoted to admin");


        var un = users.filter(f=> f.id === user)[0].username

        var em = users.filter(f=> f.id === user)[0].email

        var message = "Hi, Dear "+un+" your account in NTM CHARITY has been Promoted to admin!\nThanks!"

        var subject = "Account Promoted"

        PostEmailRequest({"email":em,subject:subject,message:message})
        .then((e)=>{console.log(e)})

        setRealod(realod+1);
        setAdmin("")
        setUser("")

        setLoad(false);
      }
      else
      {
        setDialogText("sth went wrong");
        setLoad(false);
      }
    })
    .catch(e=>{
      setDialogText("sth went wrong");
      setLoad(false);
    })

    }

  }


  

  const CreateDialog=()=>{
    return <Dialog
    style={{backgroundColor: 'transparent'}} open={dialogStatus}>
        <div style={{padding: '16px'}}>

          {RenderDialogContent()}

        </div>
    </Dialog>
  }

  const RenderDialogContent =()=>{

    if(load)
    {
      return <LinearProgress style={{width:"200px",margin:24}} />
    }

    return <div>

      <div style={{padding: '16px', fontSize:"18px"}}>{dialogText}</div>

      <Button
        variant="contained"
        size="medium"
        fullWidth
        style= {{
          backgroundColor: "#1976d2",
          paddingRight:24,
          paddingLeft:24,
          textAlign: "center",
        }} 
        onClick={()=>{setDialogStatus(false); setDialogText("")}}
      >
        ok
      </Button>
    </div>
    
  }
  
  const CreateAdminSelect =()=>{
      return <form style={{marginTop:"16px"}}>
      <FormControl style={{minWidth:"200px"}} >
        <Select
          labelId="demo-dialog-select-label"
          id="demo-dialog-select"
          value={admin}
          onChange={(event)=>{setAdmin(event.target.value)}}
          error={adminSelectErr}
        >
          {CreateAdminMenuItems()}
        </Select>
      </FormControl>
    </form>
  }
  
  const CreateAdminMenuItems =()=>{
      return admins.filter(f=> f.username !== localStorage.getItem("username")).map(e=> <MenuItem key={e.id+"menuitem"} value={e.id}>{e.username}</MenuItem> )
  }

  const CreateUsersSelect =()=>{
      return <form style={{marginTop:"16px"}}>
      <FormControl style={{minWidth:"200px"}} >
        <Select
          labelId="demo-dialog-select-label"
          id="demo-dialog-select"
          value={user}
          onChange={(event)=>{setUser(event.target.value)}}
          error={userSelectErr}
        >
          {CreateUsersMenuItems()}
        </Select>
      </FormControl>
    </form>
  }

  const CreateUsersMenuItems =()=>{
        return users.map(e=> <MenuItem key={e.id+"menuitem"} value={e.id}>{e.username}</MenuItem> )
  }
  
  return <div style={{"display":"flex","flexDirection":"row","flexWrap":"wrap","justifyContent":"space-around","alignItems":"stretch"}}>


    {CreateDialog()}




    <Paper style={{padding:"48px", textAlign: "center", minWidth:"400px", marginTop:"16px" }}>
    <div style={{fontWeight: "bold", fontSize: "24px",display: "grid"}}> 
    Promotion

    <div style={{fontSize: "16px", fontWeight: "normal", paddingBottom:"24px"}}>
      Choose user you want to promote
    </div>
    
    {CreateUsersSelect()}

    <div style={{width:"50%", marginInline:"auto", marginTop:"24px"}}>

      <Button
        variant="contained"
        size="medium"
        fullWidth
        style= {{
          backgroundColor: "#1976d2",
          paddingRight:24,
          paddingLeft:24,
          textAlign: "center",
        }} 
        onClick={Promote}
      >

        promote
      </Button>
    </div>


    </div>
    </Paper>

    <Paper style={{padding:"48px", textAlign: "center", minWidth:"35%",  minWidth:"400px", marginTop:"16px"}}>
    <div style={{fontWeight: "bold", fontSize: "24px",display: "grid"}}> 
    Demotion

    <div style={{fontSize: "16px", fontWeight: "normal", paddingBottom:"24px"}}>
      Choose admin you want to demote
    </div>

    
    {CreateAdminSelect()}

    

    <div style={{width:"50%", marginInline:"auto", marginTop:"24px"}}>

      <Button
        variant="contained"
        size="medium"
        fullWidth
        style= {{
          backgroundColor: "#1976d2",
          paddingRight:24,
          paddingLeft:24,
          textAlign: "center",
        }} 
        onClick={Demote}
      >

      Demotion
      </Button>
    </div>


    </div>
    </Paper>



    


  </div>
}

export default AdminManagementRenderer;
