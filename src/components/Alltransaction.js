import React,{useState,useEffect} from 'react'
import { Table,Button,Container,Row,Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

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
        })
        .then(response=> {
            console.log(response.status)
            if(response.status==200)
            {
                swal({
                    title:'Success',
                    text:'Account Deleted Successfully',
                    icon:'success',
                    button:'Ok'
                })
            }
            else{
                swal({
                    title:'Error',
                    text:"Oops something went wrong",
                    icon:'warning',
                    button:'Try Again'
                })
            }
        });
        
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
  async function postClosing(){
    await fetch("http://127.0.0.1:8000/api/closing", {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    })
  }

    return (
        <Container>
            
            <h1 className='m-2 mb-3'>Transactions</h1>
            <Row className="m">
           <Table className='m-2'>
               <tbody>
               <tr>
                   <td><h5>Date</h5></td>
                   <td><h5>Debit Account</h5></td>
                   <td><h5>Credit Account</h5></td>
                   <td><h5>Amount</h5></td>
                   <td><h5>Description</h5></td>
                   <td></td>
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
           </Row>
           <div className="row">
           <div className='col'><Link to="/addtransaction"><Button variant="success" className="sm m-2" >Create new Transaction</Button></Link></div>
                <div className='col'><Link to="/unadjusted"><Button variant="primary" className="sm m-2" >Unadjusted T&B</Button></Link></div>
                <div className='col'><Link to="/adjusted"><Button variant="primary" className="sm m-2" >Adjusted T&B</Button></Link></div>
                <div className='col'><Link to="/financialstatement"><Button variant="primary" className="sm m-2" >Financial Statements</Button></Link></div>
                <div className='col'><Link to="/postclosing"><Button variant="primary" className="sm m-2"  onClick={postClosing}>Post-Closing T&B</Button></Link></div>

            </div>
           
           </Container>
    )
}

export default Alltransactions
