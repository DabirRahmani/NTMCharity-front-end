import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Login from './view/scripts/pages/login/login';
import SignUp from './view/scripts/pages/signup/signup';
import AdminPanel from './view/scripts/pages/adminPanel/panel'
import ReactDOM from 'react-dom'

const App =() =>
{

        return (<Router >
            <div id="app" className="App">
                <Switch>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/signin" component={Login}/>
                    <Route path="/admin-panel" component={AdminPanel}/>
                </Switch>
            </div>
          </Router>);

}


export default App;