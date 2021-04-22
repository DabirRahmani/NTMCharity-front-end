import axios from "axios";

const getEventsRequest =({username, password})=> 
{
      return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/login', {username: username, password: password})
}

const setEventStatusRequest =({username, password})=> 
{
      return axios.create({baseURL: "http://127.0.0.1:8000/App1"}).post( '/login', {username: username, password: password})
}

export {getEventsRequest, setEventStatusRequest}