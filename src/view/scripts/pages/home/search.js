import React, {Component } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Select } from 'antd';
import { Redirect,Link,withRouter } from 'react-router-dom';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SingleEvent from '../home/singleEvent'
import react ,{ useState , useEffect} from 'react';
import ClearlIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

const Search = (props)=>{

    const [title,settitle]=useState("");

   const searchclick=()=>{
    props.onclick(title)
   }
   const cancelclick=()=>{
       settitle("")
       props.onclick("")
   }


    return  <div>
        <Input  
        value={title} 
        style={{ width: '50%', backgroundColor: "white", paddingLeft:"10px",fontFamily:"Sigmar One"}} 
        placeholder="search"  
        onChange={(e)=> settitle(e.target.value)}  />
                
        <IconButton onClick={searchclick}>
            <SearchIcon style={{color:"#ffc107"}} />
        </IconButton>
        
        <IconButton onClick={cancelclick}>
            <CancelSharpIcon style={{color:"#ffc107"}} />
        </IconButton>
     </div>
    }
export default Search;