import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

function Addaccount() {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState("select");
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
        <div className="col-sm-6 offset-sm-3">
            <h2>Add Account</h2>
            Enter Account<br />
            <input className="mb-2"></input>
            <br />
            Select Account Type
            <select className="custom-select" id="dropdown-basic-button" value={account} onChange={onAccChange} >
            <option value="select">--Select--</option>
            {
                        accounts.map(account => (
                            <option value={account.value}>{account.name}</option>
                        ))
                    }
            </select>
            <br/>
            <Button variant="primary">Add Account</Button>
        </div>
    )
}
export default Addaccount;