import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Login from './view/scripts/pages/login/login';
import Profile from './view/scripts/pages/profilepage/profilepage';
import EditProfile from './view/scripts/pages/editprofile/editprofile';
import SignUp from './view/scripts/pages/signup/signup';
import AdminPanel from './view/scripts/pages/adminPanel/panel'
import ReactDOM from 'react-dom'
import Home from './view/scripts/pages/home/home'
import Err404 from './view/scripts/pages/404'
import Donate from './view/scripts/pages/donate/donate';

const App =() =>
{

    return (<Router >
        <div id="app" className="App">
            <Switch>
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/Donate" component={Donate}/>
                <Route path="/editprofile" component={EditProfile}/>
                <Route path="/admin-panel" component={AdminPanel}/>
                <Route exact path="/" component={Home}/>
                <Route component={Err404}/>
            </Switch>
            
        </div>
      </Router>);

}


export default App;