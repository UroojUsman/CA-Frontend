import React, {useState, useEffect} from 'react';
import {Button, Container,Row} from 'react-bootstrap';

function Addaccount() {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState("select");
    const [Amount, setAmount] = useState();
    //const result = ['--Select--', 'Asset', "Liability", "Owner Equity", "Revenue", "Expense"];
    //http://127.0.0.1:8000/api/account npm install @material-ui/core
    useEffect(() => {
       const getAcchead=async()=>{
           await fetch("http://127.0.0.1:8000/api/account")
           .then((response)=>response.json())
           .then((data)=>{
               const accounts =data.map((account)=>(
                   {
                       name:account.ah_name,
                       value:account.ah_id
                   }
               ));
               setAccounts(accounts);
           });
       };
       getAcchead();
    }, []);
    
    const onAccChange= (e) => {
        const selectacc = e.target.value;
        setAccount(selectacc);
        console.log(selectacc)
    }
    return (
        <Container className="col-sm-6 mt-3 offset-sm-3">
            <h2>Add Account</h2>
            <Row className='m-1'>
            Enter Account<br />
            <input className="mb-3 mt-2" style={{ width: "100%" }} value={Amount} onChange={(e) => setAmount(e.target.value)}></input>
            </Row>
            <Row className="m-1">
            Select Account Type
            <select className="custom-select mt-2 mb-3" id="dropdown-basic-button" value={account} onChange={onAccChange} >
            <option value="select" disabled>--Select--</option>
            {
                        accounts.map(account => (
                            <option key={account.value} value={account.value}>{account.name}</option>
                        ))
                    }
            </select>
            </Row>
            <Row className='m-1'>
            <Button variant="primary">Add Account</Button>
            </Row>
        </Container>
    )
}
export default Addaccount;