/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Message from '../../../Components/Message/Message';
import Loader from '../../../Components/Loader/loaderFile';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './SignUp.module.css';
import HeaderMain from '../../LandingPage/MainHeader/MainHeader';

interface Props {
  showSignIn: () => void;
}

const SignUp = ({ showSignIn }: Props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');;

  const { isloading, error, signUp, isloggedin } = useContext(AuthContext);
  useEffect(() => {
    if (isloggedin) {
      history.push('/home');
    }
  }, [isloggedin, history]);
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, password, first_name, last_name);
      history.push('/home');
  
  };

  return (
    <>
      <HeaderMain />
      <div className={classes.divWrapper}>
        <div className={classes.ModalWrapper}>
          <div className={classes.header}>
            {error && <Message variant='danger'>{error}</Message>}
            {isloading && <Loader />}
            <h2 className={classes.ModalHeaderText}>Ready to sign Up?</h2>
            <h2 className={classes.ModalHeader2}>Log In</h2>
          </div>
          <div className={classes.ModalBody}>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => signUpHandler(e)}>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='email'
                    value={email}
                    name='email'
                    placeholder='Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='text'
                    value={first_name}
                    name='firstname'
                    placeholder='FirstName'
                    required
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='text'
                    value={last_name}
                    name='lastname'
                    placeholder='LastName'
                    required
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='password'
                    value={password}
                    name='password'
                    placeholder='Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.signUpGroup}>
                  <div className={classes.ModalTerms}>
                    <p className={classes.ModalTermsFirst}>
                      By clicking on &apos;Sign up&apos;, you accept the <br />
                      <span className={classes.ModalTermsH5}>Terms and Conditions to use</span>
                    </p>
                  </div>

                  <button className={classes.ModalSignUp} type='submit'>
                    SIGN UP
                  </button>
                </div>
              </form>
              <p className={classes.Footer}>
                Already have an account?
                <span
                  onClick={() => {
                    showSignIn();
                  }}
                  style={{ color: '#2D9BEF' }}
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
