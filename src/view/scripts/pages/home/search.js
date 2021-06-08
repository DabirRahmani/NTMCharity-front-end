import React, {Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Select } from 'antd';
import { Redirect,Link,withRouter } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SingleEvent from '../home/singleEvent'
import { useState , useEffect} from 'react';
import ClearlIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';

const Search = (props)=>{

    const [title,settitle]=useState("");

   const searchclick=()=>{
    props.onclick(title)
    }

   const cancelclick=()=>
   {
       settitle("")
       props.onclick("")
   }

   const [status, setStatus]= useState(false)

   const [inputBackGround,setInputBackGround]= useState(fade("#fff", 0.15))

   useEffect(()=>{
       if(!(/\S/.test(title)))
       {
        settitle("")
        setStatus(false)

       } 
       else
       {
           setStatus(true)
       }
   },[title])

   const CreateCancelButton=()=>{
       if(status === true)
       return <IconButton 
       style={{ 
           minWidth:"24px",
       }}        
       size="small" 
       onClick={cancelclick}>
           <ClearlIcon/>
       </IconButton>

       return <div style={{marginRight:"30px", display:"inline"}}></div>
   }

    return  <div
    onMouseEnter={()=>{setInputBackGround(fade("#fff", 0.35))}}
    onMouseLeave={()=>{setInputBackGround(fade("#fff", 0.15))}}
    style={{ 
        minWidth:'248px',
        width: '180px',
        paddingLeft:"10px",
        marginLeft:"55px",
        backgroundColor: inputBackGround,
        borderRadius:"4px",
        fontFamily:"Sigmar One",
    }}
    >
        <InputBase  
        style={{ 
        width: '180px',
        minWidth:'180px',
        marginLeft:"5px"

        }}
        value={title} 
        placeholder="search"  
        onChange={(e)=> settitle(e.target.value)}
        />

        {CreateCancelButton()}

                
        <IconButton 
        style={{ 
            minWidth:"24px",
            marginLeft:"-7px"
        }}  
        size="small" 
        onClick={searchclick}>
            <SearchIcon/>
        </IconButton>
        

     </div>
    }
export default Search;