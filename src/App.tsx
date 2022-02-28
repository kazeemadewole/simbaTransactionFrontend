import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './Pages/Auth/Login/LogIn';
import SignUp from './Pages/Auth/SignUp/SignUp';
import ResetPassword from './Pages/Auth/resetPassword/RestPassword';
import ForgotPassword from './Pages/Auth/forgotPassword/forgotPassword';
import {Home } from './Pages/Home/Home';
import NewTransaction from './Pages/newTransaction/newTransaction';

function App() {
  return (
    <div className="App">
   <AuthProvider>
          <Router>
            <Switch>
        <Route exact path='/' component={LogIn} />
        <Route exact path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/password-reset' component={ResetPassword} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/home' component={Home} />
        <Route path='/new-transaction' component={NewTransaction} />
      </Switch>
          </Router>
      </AuthProvider>   
    </div>
  );
}

export default App;
