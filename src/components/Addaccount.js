import React, { useState, useEffect } from 'react';
import { Button, Container, Row,Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import swal from 'sweetalert'

function Addaccount() {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState("select");
    const [query, setQuery] = useState('');
    const [term, setTerm] = useState([]);
    const [AccountError, setAccountError] = useState("");
    const [AccTypeError, setAccTypeError] = useState("");
    //const result = ['--Select--', 'Asset', "Liability", "Owner Equity", "Revenue", "Expense"];
    //http://127.0.0.1:8000/api/account npm install @material-ui/core
    useEffect(() => {
        const getAcchead = async () => {
            await fetch("http://127.0.0.1:8000/api/account")
                .then((response) => response.json())
                .then((data) => {
                    const accounts = data.map((account) => (
                        {
                            name: account.ah_name,
                            value: account.ah_id
                        }
                    ));
                    setAccounts(accounts);
                });
        };
        getAcchead();
    }, []);

    const onAccChange = (e) => {
        const selectacc = e.target.value;
        setAccount(selectacc);

    }
    const onHandleChange = async (e) => {
        const result = e.target.value;
        //console.log(result)
        setQuery(result)
    }

    const Validator = () => {
        let AccountError = "";
        let AccountTypeError = "";
        if (!query) {
            AccountError = 'Account name is required';
            setAccountError(AccountError);
            console.log(AccountError);
        }
        if (account ==="select") {
            AccountTypeError = "Account Type must be selected ";
            setAccTypeError(AccountTypeError);
            console.log(AccountTypeError);
            console.log(account);
        }
        if( AccountError || AccountTypeError)
        {   
            AccountError = "";
            AccountTypeError = "";
            return false;
        }
        return true;

    }

    useEffect(() => {
        const getAcc = async () => {
            await fetch("http://127.0.0.1:8000/api/accountctrl")
                .then((response) => response.json())
                .then((data) => {
                    setTerm(data)
                    
                });
        };
        getAcc();
    }, []);

    const onSubmit = async () => {
        const isValid = Validator();
        if (isValid) {
        const [ac_name, ah_id] = [query, account];
        const item = { ac_name, ah_id }
        const sample = term.filter(T => T.ac_name.toUpperCase() === ac_name.toUpperCase())
        console.log(sample);
        if (sample.length === 0) {
            let submit = await fetch("http://127.0.0.1:8000/api/setaccount", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
                
            })
            .then(response=> {
                if(response.status==201)
                {
                    swal({
                        title:'Success',
                        text:'Account Created Successfully',
                        icon:'success',
                        button:'Ok'
                    })
                }
            });

            ClearFields();
        }
        else{

            swal({
                title: "Account Already Exist",
                icon: "warning",
              });

        }
    }

    }
    
    function ClearFields() {
        setQuery('');
        setAccount('select');
    }
    return (
        <Container className="col-sm-6 mt-3 offset-sm-3">
          
            <h2>Add Account</h2>
            <Row className='m-1'>
                Enter Account<br />
                <input className="mb-3 mt-2" style={{ width: "100%" }} value={query} onChange={onHandleChange}></input>
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
                <Button variant="primary" onClick={onSubmit}>Add Account</Button>
            </Row>
            <Row>
            <center><Link to="/addtransaction"><Button variant="success" className="sm m-2" >Proceed</Button></Link></center>
            </Row>
        </Container>
    )
}
export default Addaccount;