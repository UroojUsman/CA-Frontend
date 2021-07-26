import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

export const Transaction = () => {
    const [debitAcc, setDebitAcc] = useState([]);
    const [creditAcc, setCreditAcc] = useState([]);
    const [daccount, setDAccount] = useState("select");
    const [caccount, setCAccount] = useState("select");
    const result = ['--Select--', 'Cash', "Account Payable", "Account Receivable"];

    useEffect(() => {
        const getDebAcc=async()=>{
            await fetch("http://127.0.0.1:8000/api/accountctrl")
            .then((response)=>response.json())
            .then((data)=>{
                const debitAcc =data.map((daccount)=>(
                    {
                        name:daccount.ac_name,
                        value:daccount.ac_id
                    }
                ));
                setDebitAcc(debitAcc);
            });
        };
        getDebAcc();
     }, []);
     useEffect(() => {
        const getCredAcc=async()=>{
            await fetch("http://127.0.0.1:8000/api/accountctrl")
            .then((response)=>response.json())
            .then((data)=>{
                const creditAcc =data.map((caccount)=>(
                    {
                        name:caccount.ac_name,
                        value:caccount.ac_id
                    }
                ));
                setCreditAcc(creditAcc);
            });
        };
        getCredAcc();
     }, []);
    const onDebAccChange = (e) => {
        const selectacc = e.target.value;
        setDAccount(selectacc)
        console.log(selectacc)
    }
    const onCredAccChange = (e) => {
        const selectacc = e.target.value;
        setCAccount(selectacc)
        console.log(selectacc)
    }
    return (
        <div className="col-sm-6 offset-sm-3">
            <h2>Journal Entries</h2>
            <>
                Enter Transaction Date <br />
                <DatePickerComponent className='dcomp' placeholder='Enter Date'></DatePickerComponent>
            Select Debit Account
                <select className="custom-select" id="dropdown-basic-button" value={daccount} onChange={onDebAccChange}>
                <option value="select">--Select--</option>
                    {
                        debitAcc.map(daccount => (
                            <option value={daccount.value}>{daccount.name}</option>
                        ))
                    }
                </select>
                <br />
            Select Credit Account
                <select className="custom-select" id="dropdown-basic-button" value={caccount} onChange={onCredAccChange}>
                <option value="select">--Select--</option>
                    {
                        creditAcc.map(caccount => (
                            <option value={caccount.value}>{caccount.name}</option>
                        ))
                    }

                </select>
                <br />
            Enter Amount<br />
                <input placeholder="$"className="mb-2"></input>
                <br />
                <Button  variant="primary">Add Transaction</Button>

            </>
        </div>
    )
}
