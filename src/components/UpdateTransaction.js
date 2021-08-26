import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';



function UpdateTransaction(props) {
    console.log('props', props);

    const DateInit = (e) => {
        const newdate = e;
        const showdate = new Date(newdate);
        const update = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

        return update;
    }


    const [data, setdata] = useState([]);
    const updateddate = DateInit(new Date());
    const [debitAcc, setDebitAcc] = useState([]);
    const [creditAcc, setCreditAcc] = useState([]);
    const [date, setDate] = useState(updateddate);
    const [daccount, setDAccount] = useState('Select');
    const [caccount, setCAccount] = useState('Select');
    const [amount, setamount] = useState();
    const [description, setdescription] = useState();



    const onDateChange = (e) => {
        const newdate = e.target.value;
        const showdate = new Date(newdate);
        const update = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
        console.log('Updated', update);
        setDate(update)
    }
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

    async function SubmitForm(id) {

           const item={date,daccount,caccount,amount,description};
           console.warn(item);
           let result= await fetch("http://127.0.0.1:8000/api/updatetransaction/"+id+"?_method=PUT",{
               method:'PUT',
               body: JSON.stringify(item),
               headers:{
                   "Content-Type":'application/json',
                   "Accept":'application/json'
               }
           })
           result= await result.json();
           console.warn('result',result);
           
       
    }

    useEffect(() => {
        const getAcc = async () => {
            await fetch("http://127.0.0.1:8000/api/accountctrl")
                .then((response) => response.json())
                .then((data) => {
                    const debitAcc = data.map((daccount) => (
                        {
                            name: daccount.ac_name,
                            value: daccount.ac_id
                        }
                    ));
                    setDebitAcc(debitAcc);
                    setCreditAcc(debitAcc);

                });
        };
        getAcc();
    }, []);



    useEffect(async () => {
        /*    let result= await fetch('http://127.0.0.1:8000/api/transaction/'+props.match.params.id);
             result=await result.json();*/
        const getEntry = async () => {
            await fetch('http://127.0.0.1:8000/api/transaction/' + props.match.params.id)
                .then((response) => response.json())
                .then((data) => {
                    const result = {
                        t_id: data.t_id,
                        credit_account: data.credit_account,
                        debit_account: data.debit_account,
                        amount: data.amount,
                        description: data.description
                    }
                    setdata(result);
                    setDate(data.date);
                    setCAccount(data.credit_account);
                    console.log(caccount);
                    setDAccount(data.debit_account);
                    console.log(daccount);
                    setamount(data.amount);
                    setdescription(data.description);
                });
        };
        getEntry();



    }, []);

    return (
        <div>
            <Container className="col-sm-6 offset-sm-3">
                <Row>
                    <h2 className="m-3">Update Transaction</h2>
                </Row>
                <>
                    <Row className="m-1">
                        Enter Transaction Date <br />
                        <DatePickerComponent className='dcomp' placeholder='Enter Date' format='yyyy-MM-dd' value={date} onChange={onDateChange}></DatePickerComponent>

                    </Row>
                    <Row className="m-1">
                        Select Debit Account
                        <select className="custom-select" id="dropdown-basic-button" type="date" value={daccount} onChange={onDebAccChange}>
                            <option value="select" disabled>--Select--</option>
                            {
                                debitAcc.map(daccount => (
                                    <option key={daccount.value} value={daccount.name}>{daccount.name}</option>
                                ))
                            }
                        </select>
                    </Row>
                    <br />
                    <Row className='m-1'>
                        Select Credit Account
                        <select className="custom-select" id="dropdown-basic-button" value={caccount} onChange={onCredAccChange}>
                            <option value="select" disabled>--Select--</option>
                            {
                                creditAcc.map(caccount => (
                                    <option key={caccount.value} value={caccount.name}>{caccount.name}</option>
                                ))
                            }

                        </select>
                    </Row>
                    <br />
                    <Row className='m-1'>
                        Enter Amount <br />
                    </Row>
                    <Row className="m-1">
                        <input placeholder="Rs." className="mb-2" style={{ width: "100%" }} defaultValue={data.amount} onChange={(e) => setamount(e.target.value)}></input>

                    </Row>

                    <br />
                    <Row className="m-1">
                        Description<br />
                        <textarea className="mb-2 mt-1" style={{ width: "100%" }} defaultValue={data.description} onChange={(e) => setdescription(e.target.value)}></textarea>
                    </Row>
                    <br />
                    <Button variant="primary" className="m-1" onClick={() => { SubmitForm(data.t_id) }}>Update Transaction</Button>

                </>
            </Container>
        </div>
    )
}

export default withRouter(UpdateTransaction)
