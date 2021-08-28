import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Transaction() {

    const DateInit = (e) => {
        const newdate = e;
        const showdate = new Date(newdate);
        const update = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();

        return update;
    }

    const updateddate = DateInit(new Date());
    const [debitAcc, setDebitAcc] = useState([]);
    const [creditAcc, setCreditAcc] = useState([]);
    const [date, setDate] = useState(updateddate);
    const [daccount, setDAccount] = useState("select");
    const [caccount, setCAccount] = useState("select");
    const [amount, setamount] = useState();
    const [description, setdescription] = useState("");
    const [dateError, setdateError] = useState("");
    const [DaccError, setDaccError] = useState("");
    const [CaccError, setCaccError] = useState("");
    const [amountError, setamountError] = useState();
    const [descError, setdescError] = useState("");

    //  const result = ['--Select--', 'Cash', "Account Payable", "Account Receivable"];

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

    /*  useEffect(() => {
          const getCredAcc = async () => {
              await fetch("http://127.0.0.1:8000/api/accountctrl")
                  .then((response) => response.json())
                  .then((data) => {
                      const creditAcc = data.map((caccount) => (
                          {
                              name: caccount.ac_name,
                              value: caccount.ac_id
                          }
                      ));
                      setCreditAcc(creditAcc);
                  });
          };
          getCredAcc();
      }, []);*/
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


    const onDateChange = (e) => {
        const newdate = e.target.value;
        const showdate = new Date(newdate);
        const update = showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate();
        console.log('Updated', update);
        setDate(update)
    }

    const Validator = () => {
        let dateError = '';
        let CacError = "";
        let DacError = "";
        let amountError = '';
        let descriptionError = "";
        if (!date) {
            dateError = "Date is required";
            setdateError(dateError);
        }
        if (caccount === 'select') {
            CacError = "Credit Account is required";
            setCaccError(CacError);
        }
        if (daccount === 'select') {
            DacError = "Debit Account is required";
            setDaccError(DacError);
        }
        if (!amount) {
            amountError = "Amount is required";
            setamountError(amountError);
        }
        if (!description) {
            descriptionError = "Description is required";
            setdescError(descriptionError);
        }
        if (dateError || CacError || DacError || amountError || descriptionError) {
            dateError = "";
            CacError = '';
            DacError = "";
            amountError = "";
            descriptionError = "";
            return false;
        }
        return true;

    }

    function ClearFields() {
        setDate(updateddate)
        setDAccount('select');
        setCAccount('select');
        setamount(0);
        setdescription('');
    }
    async function SubmitForm() {

        const isValid = Validator();
        if (isValid) {
            const item = { date, daccount, caccount, amount, description };
            console.warn(item);
            let result = await fetch("http://127.0.0.1:8000/api/Transaction", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            .then(response=> {
                if(response.status==200)
                {
                    swal({
                        title:'Success',
                        text:"Transaction Created Successfully",
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
            ClearFields();
           
        }
    }
    


    return (
        <Container className="col-sm-6 offset-sm-3">
            <Row>
                <h2 className="m-3">Journal Entries</h2>
            </Row>
            <>
                <Row className="m-1">
                    Enter Transaction Date <br />
                    <DatePickerComponent className='dcomp' placeholder='Enter Date' format='yyyy-MM-dd' value={date} onChange={onDateChange}></DatePickerComponent>
                    <div className='mb-1' style={{ color: 'red' }}>{dateError}</div>
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
                    <div className='mb-1' style={{ color: 'red' }}>{DaccError}</div>

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
                    <div className='mb-1' style={{ color: 'red' }}>{CaccError}</div>
                </Row>
                <br />
                <Row className='m-1'>
                    Enter Amount <br />
                </Row>
                <Row className="m-1">
                    <input placeholder="Rs." className="mb-2" style={{ width: "100%" }} value={amount} onChange={(e) => setamount(e.target.value)}></input>
                    <div className='mb-1' style={{ color: 'red' }}>{amountError}</div>
                </Row>

                <br />
                <Row className="m-1">
                    Description<br />
                    <textarea className="mb-2 mt-1" style={{ width: "100%" }} value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                    <div className='mb-1' style={{ color: 'red' }}>{descError}</div>
                </Row>
                <br />
                <Button variant="primary" className="m-1" onClick={SubmitForm}>Add Transaction</Button>
                <span><Link to="/alltransaction"><Button variant="primary" className="m-1" >Show Transactions</Button></Link></span>

            </>
        </Container>
    )
}
export default Transaction;