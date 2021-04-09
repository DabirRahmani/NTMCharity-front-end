import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import Login from './view/scripts/pages/login/login';
import SignUp from './view/scripts/pages/signup/signup';

const App =() =>
{

    return (<Router>
      <div className="App">
          <Switch>
              <Route path="/signup" component={SignUp}/>
              <Route path="/signin" component={Login}/>

          </Switch>
      </div>
    </Router>);

}


export default App;