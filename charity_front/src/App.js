//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Login from './view/scripts/pages/login/login.js';




const App =() =>{

    return (<Router>
      <div className="App" style={{overflowY:"hidden", height:"100vh"}}>
          <Switch>
              <Route path="/login" component={Login}/>
          </Switch>
      </div>
    </Router>);

}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} 
*/

export default App;