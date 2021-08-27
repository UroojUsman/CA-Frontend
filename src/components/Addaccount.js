import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';

function Addaccount() {
    const [accounts, setAccounts] = useState([]);
    const [account, setAccount] = useState("select");
    const [query, setQuery] = useState();
    const [term, setTerm] = useState([]);
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
            });
            submit = await submit.json();
            console.log("result", submit)
            ClearFields();
        }
        else{

            console.log("Account Already Exist")

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
        </Container>
    )
}
export default Addaccount;