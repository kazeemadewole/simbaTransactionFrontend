/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface Props {
  children: ReactNode;
}
interface AuthStatus {
  isloggedin: boolean;
  setIsloggedin: Dispatch<SetStateAction<boolean>>;
  isloading: boolean;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  login: (email: string, password: string) => void;
  fblogin: () => void;
  googlelogin: () => void;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => void;
  showSignup: boolean;
  showLogin: boolean;
  setShowSignup: Dispatch<SetStateAction<boolean>>;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  setIsloading: Dispatch<SetStateAction<boolean>>;
}
export const AuthContext = createContext({} as AuthStatus);
const AuthProvider = (props: Props) => {
  const [isloggedin, setIsloggedin] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  async function signUp(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
  ) {
    try {
      const signUpData = {
        email,
        password,
        first_name,
        last_name,
      };
      
      setIsloading(true);
      const res = await axios.post(' http://127.0.0.1:5100/api/user/create', signUpData);
      
      setIsloading(false);
      if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data.id));
        localStorage.setItem('token', JSON.stringify(res.data.token));
        setIsloggedin(true);
        console.log({isloggedin});
        
      } else if (res.status === 400) {
        setIsloading(false);
        setError('User Already Exists');
      } else {
        setError('something went wrong');
      }
    } catch (err:any) {
      setIsloading(false);
      err.response.data && err.response.data.message && setError(err.response.data.message);
    }
  }
  async function login(email: string, password: string) {
    try {
      const loginUser = {
        email,
        password,
      };
      setIsloading(true);
      const { data } = await axios.post('http://127.0.0.1:5100/api/user/signin', loginUser);
      setIsloading(false);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', JSON.stringify(data.token));

      setIsloggedin(true);
    } catch (err:any) {
      setIsloading(false);
      err.response.data && err.response.data.message && setError(err.response.data.message);
    }
  }

  async function googlelogin() {
    try {
      setIsloading(true);
      const config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
      };
      const res = await axios.get('https://musicboxgroupc.herokuapp.com/auth/google', config);
      setIsloading(false);
      localStorage.setItem('User', JSON.stringify(res));
      localStorage.setItem('token', JSON.stringify(res));

      setIsloggedin(true);
    } catch (err:any) {
      setIsloading(false);
      err.response.data && err.response.data.message && setError(err.response.data.message);
    }
  }

  async function fblogin() {
    try {
      setIsloading(true);
      const res = await axios.get('https://musicboxgroupc.herokuapp.com/auth/facebook');
      setIsloading(false);
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('token', JSON.stringify(res));

      setIsloggedin(true);
    } catch (err:any) {
      setIsloading(false);
      err.response.data && err.response.data.message && setError(err.response.data.message);
    }
  }

  const value = {
    isloggedin,
    setIsloggedin,
    error,
    isloading,
    login,
    fblogin,
    googlelogin,
    signUp,
    setError,
    showSignup,
    showLogin,
    setShowSignup,
    setShowLogin,
    setIsloading,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
export default AuthProvider;
