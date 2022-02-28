/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './LogIn.module.css';
import MainHeader from '../../LandingPage/MainHeader/MainHeader';

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(true);
  const { setIsloading,  login, isloggedin } = useContext(AuthContext);

  useEffect(() => {
    if (isloggedin) {
      history.push('/home');
    }
  });

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    login(email, password);
      history.push('/home');
    
  };
  return (
    <>
      <MainHeader />
      <div className={classes.divWrapper}>
        <div className={classes.ModalWrapper}>
          <div className={classes.ModalBody}>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => loginHandler(e)}>
                <div className={classes.Form}>
                  <label htmlFor='email' className={classes.TextLabel}>
                    Email
                  </label>
                  <input
                    className={classes.FormInput}
                    id='email'
                    type='email'
                    value={email}
                    name='email'
                    placeholder='Enter Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <label htmlFor='password' className={classes.TextLabel}>
                    Password
                  </label>
                  <input
                    className={classes.FormInput}
                    type='password'
                    id='password'
                    value={password}
                    name='password'
                    placeholder='Enter Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.ModalFormChild}>
                  <div className={classes.ModalFormChilds}>
                    <input
                      type='checkbox'
                      id='RememberMe'
                      checked={check}
                      value='Remember Me'
                      onChange={() => setCheck(!check)}
                    />
                    <label htmlFor='RememberMe' className={classes.InputLabel}>
                      Remember Me
                    </label>
                  </div>
                 
                </div>
                <button className={classes.ModalSignUp} type='submit'>
                    LOG IN
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
