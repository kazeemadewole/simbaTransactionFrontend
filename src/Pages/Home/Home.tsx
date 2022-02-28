import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import classes from './Home.module.css';

export const Home = () => {
     const [transaction, setTransaction] = useState([]);

     const getTransaction = async () => {
        const config = {
            headers: { 'Access-Control-Allow-Origin': '*',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzMDE5NmFiLTY1ZjgtNDRjOS1iMTUwLTExYWYyYjZiMjkyNSIsImZpcnN0X25hbWUiOiJhYmlvZHVuIiwibGFzdF9uYW1lIjoiYWppYmFkZSIsImVtYWlsIjoiYWRlYmF5b2FkZXdvbGU5NTlAZ21haWwuY29tIiwiaWF0IjoxNjQ2MDIxNTk5fQ.tv6rB8IpBi5sQ2Hdc3OlvlNWZXIfbLO1EjmsODrq_14'
        },
          };
        const res:any =  await axios.get('http://127.0.0.1:5100/api/user/transaction/5648ea8a-0c2f-4e68-82c6-82dc6bbdecf2', config)
        setTransaction(res.data.payload);
     }


    useEffect( () => {  
          getTransaction()
         
    }, [])
   
    return (
        <div>
    <div className={classes.table_wrapper}>
        <div className= {classes.header_info}>
            <h2>Transactions</h2>
            <NavLink to='/new-transaction'>
            <Button >New Transaction</Button>
            </NavLink>
        </div>
         <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>From</th>
      <th>To</th>
      <th>Value</th>
      <th>Currency</th>
      <th>Created At</th>
      <th>Updated At</th>
    </tr>
  </thead>
  <tbody>
      {transaction  && transaction.map((tr:any) => (
          <tr>
          <td>{tr.id}</td>
          <td>{tr.sender.first_name} {tr.sender.last_name}</td>
          <td>{tr.receiver.first_name} {tr.receiver.last_name}</td>
          <td>{tr.amount}</td>
          <td>{tr.currency}</td>
          <td>{tr.created_at}</td>
          <td>{tr.updated_at}</td>
        </tr>
      ))}

  </tbody>
</Table>

</div>
        </div>
    )
}
