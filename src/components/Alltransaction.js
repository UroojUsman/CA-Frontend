import React,{useState,useEffect} from 'react'
import { Table,Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Alltransactions() {
    const[transactions,setTransaction]=useState([]);
    useEffect(() => {

        gettransaction();
    }, []);
    console.log(transactions)
    {/*const lists=[
        {date:"2021-08-25", debitacc:"Cash",creditacc:"Account Receivables",amount:"2300"},
        {date:"2021-08-25", debitacc:"Account Payable",creditacc:"Cash",amount:"4000"}
    ]
    console.log(lists)*/}

    async function deleteOperation(id)
    {
        let result = await fetch('http://127.0.0.1:8000/api/delete/'+id,{
            method:'DELETE'
        });
        result= await result.json();
        console.log(result);
        gettransaction();
    }
  async function gettransaction()
  {
    await fetch("http://127.0.0.1:8000/api/alltransaction")
    .then((response) => response.json())
    .then((data) => {
         setTransaction(data)
    });
  }

    return (
        <div>
            <h1 className='m-2 mb-3'>Transactions</h1>
           <Table className='m-2'>
               <tbody>
               <tr>
                   <td><h5>Date</h5></td>
                   <td><h5>Debit Account</h5></td>
                   <td><h5>Credit Account</h5></td>
                   <td><h5>Amount</h5></td>
                   <td><h5>Description</h5></td>

               </tr>
               {
                   transactions.map((transaction)=>
                   <tr key={transaction.t_id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.debit_account}</td>
                        <td>{transaction.credit_account}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                        <td> <Link to={"/updateTransaction/"+transaction.t_id}><Button variant="primary" className="sm mr-2">Edit</Button></Link>
                        <Button variant="danger" className="sm mr-2" onClick={()=>{deleteOperation(transaction.t_id)}} >Delete</Button>
                         </td>
                   </tr>
                   
                   )
               }
               </tbody>
           </Table>
           <Link to="/addtransaction"><Button variant="success" className="sm m-2" >Create new Transaction</Button></Link>
        </div>
    )
}

export default Alltransactions
