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


const { Option } = Input;
const proxyurl = localStorage.getItem('url');
const Search = (props)=>{

    const [title,settitle]=useState("");
   const onSelect = () => {
        axios.post("http://127.0.0.1:8000/App1/Search", {search_key: this.state.title} )
            .then(res => {
                this.setState(prevState => {
                    return { suggestlist: res.data.event_set }
                })
            })
    }
   const searchclick=()=>{
    props.onclick(title)
   }
   const cancelclick=()=>{
       settitle("")
       props.onclick("")
   }
   const onChange = (e) => {

        this.setState({title :e.target.value});

    };

        return  <div>
                <Input  value={title} style={{ width: '50%', backgroundColor: "white", paddingLeft:"10px"}} placeholder="search"  onChange={(e)=> settitle(e.target.value)}  />
                <Button onClick={searchclick} size="small" style={{paddingLeft:"20px"}} >Search</Button>
                <IconButton onClick={cancelclick}>
                    <ClearlIcon/>
                </IconButton>
                 </div>
    }
export default Search;