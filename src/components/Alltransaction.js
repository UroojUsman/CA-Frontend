import React,{useState,useEffect} from 'react'
import { Table,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Alltransactions() {
    const[transactions,setTransaction]=useState([]);
    useEffect(() => {
        const gettransaction = async () => {
            await fetch("http://127.0.0.1:8000/api/alltransaction")
                .then((response) => response.json())
                .then((data) => {
                     setTransaction(data)
                });
        };
        gettransaction();
    }, []);
    console.log(transactions)
    {/*const lists=[
        {date:"2021-08-25", debitacc:"Cash",creditacc:"Account Receivables",amount:"2300"},
        {date:"2021-08-25", debitacc:"Account Payable",creditacc:"Cash",amount:"4000"}
    ]
    console.log(lists)*/}
    return (
        <div>
           <Table>
               <tbody>
               <tr>
                   <td><h5>Date</h5></td>
                   <td><h5>Debit Account</h5></td>
                   <td><h5>Credit Account</h5></td>
                   <td><h5>Amount</h5></td>
               </tr>
               {
                   transactions.map((transaction)=>
                   <tr key={transaction.t_id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.debit_account}</td>
                        <td>{transaction.credit_account}</td>
                        <td>{transaction.amount}</td>
                        <td><Button variant="primary" className="sm">Edit</Button>
                         <Button variant="secondary" className="sm" >Delete</Button></td>
                   </tr>
                   
                   )
               }
               </tbody>
           </Table>
           <Link to="/addtransaction"><Button variant="primary" className="sm" >Create new Transaction</Button></Link>
        </div>
    )
}

export default Alltransactions
