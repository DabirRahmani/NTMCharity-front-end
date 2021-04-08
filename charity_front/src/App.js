//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Login from './view/scripts/pages/login/login.js';
import SignUp from './view/scripts/pages/signup/signup';

const App =() =>{

    return (<Router>
      <div className="App" style={{overflowY:"hidden"}}>
          <Switch>
              <Route  path="/login" component={Login}/>
              <Route  path="/signup" component={SignUp}/>
              <Route  path="/" component={Login}/>

          </Switch>
      </div>
    </Router>);

}


export default App;