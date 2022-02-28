/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import  { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './newTransaction.module.css';
import HeaderMain from '../LandingPage/MainHeader/MainHeader';
import axios from 'axios';

interface Props {
  showSignIn: () => void;
}

const NewTransaction = ({ showSignIn }: Props) => {
  const history = useHistory();
  const [sender_id, setSender_id] = useState('');
  const [receiver_id, setReceiver_id] = useState('');
  const [amount, setAmount] = useState('');

 const createTransaction = async () => {
     const data = {
             sender_id,
             receiver_id,
             amount
            };
            const config = {
                headers: { 'Access-Control-Allow-Origin': '*',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzMDE5NmFiLTY1ZjgtNDRjOS1iMTUwLTExYWYyYjZiMjkyNSIsImZpcnN0X25hbWUiOiJhYmlvZHVuIiwibGFzdF9uYW1lIjoiYWppYmFkZSIsImVtYWlsIjoiYWRlYmF5b2FkZXdvbGU5NTlAZ21haWwuY29tIiwiaWF0IjoxNjQ2MDIxNTk5fQ.tv6rB8IpBi5sQ2Hdc3OlvlNWZXIfbLO1EjmsODrq_14'
            },
              };
      axios.post('http://127.0.0.1:5100/api/user/account/sendmoney', data, config)
         history.push('/home')
     
 }
 
  return (
    <>
      <HeaderMain />
      <div className={classes.divWrapper}>
        <div className={classes.ModalWrapper}>
          <div className={classes.header}>
            <h2 className={classes.ModalHeaderText}>Create New Transaction?</h2>
          </div>
          <div className={classes.ModalBody}>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={() =>createTransaction()}>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='text'
                    value={sender_id}
                    name='sender_account_number'
                    placeholder='sender_account_number'
                    required
                    onChange={(e) => setSender_id(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                <input
                    className={classes.FormInput}
                    type='text'
                    value={receiver_id}
                    name='receiver_account_number'
                    placeholder='receiver_account_number'
                    required
                    onChange={(e) => setReceiver_id(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='number'
                    value={amount}
                    name='amount'
                    placeholder='amount'
                    required
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
               
                <div className={classes.signUpGroup}>
                  

                  <button className={classes.ModalSignUp} type='submit'>
                    SEND MONEY
                  </button>
                </div>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTransaction;
