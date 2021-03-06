import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactToPdf from 'react-to-pdf';


const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [15, 10]
};

function Financialstatement() {
    const [accounts, setAccounts] = useState([]);
    const [netIncome, setnetIncome] = useState();
    const [rev, setrev] = useState();
    const [exp, setexp] = useState();
   


    useEffect(() => {
        const getAcc = async () => {
            await fetch("http://127.0.0.1:8000/api/accountsort")
                .then((response) => response.json())
                .then((data) => {
                    setAccounts(data)
                    console.log(data)
                });
        };
        getAcc();

    }, []);

    useEffect(() => {
        const getNet = async () => {
            await fetch("http://127.0.0.1:8000/api/getNetIncome")
                .then((response) => response.json())
                .then((data) => {
                    setnetIncome(data);
                    
                });
        };
        getNet();
        console.log(netIncome)

    }, []);

    const showRev = accounts.map((account) => {
        if (account.ah_id === 4) {
            const value = account.ac_debit - account.ac_credit
            console.log((account.ac_debit & account.ac_credit))
            if ((account.ac_debit | account.ac_credit) != 0) {

                if (value !== 0) {

                    return <tr key={account.ac_id}>
                        <td></td>
                        <td>{account.ac_name}</td>
                        <td>{value > 0 ? value : ""}</td>
                        <td>{value < 0 ? -(value) : ""}</td>
                        <td></td>
                        <td></td>
                    </tr>
                }
            }
        }

    })

    const showExp = accounts.map((account) => {
        if (account.ah_id === 5) {
            const value = account.ac_debit - account.ac_credit
            console.log((account.ac_debit & account.ac_credit))
            if ((account.ac_debit | account.ac_credit) != 0) {

                if (value !== 0) {

                    return <tr key={account.ac_id}>
                        <td></td>
                        <td>{account.ac_name}</td>
                        <td>{value > 0 ? value : ""}</td>
                        <td>{value < 0 ? -(value) : ""}</td>
                        <td></td>
                        <td></td>
                    </tr>
                }
            }
        }

    })

    const showAsset = accounts.map((account) => {
        if (account.ah_id === 1) {
            const value = account.ac_debit - account.ac_credit
            console.log((account.ac_debit & account.ac_credit))
            if ((account.ac_debit | account.ac_credit) != 0) {

                if (value !== 0) {

                    return <tr key={account.ac_id}>
                        <td></td>
                        <td>{account.ac_name}</td>
                        <td>{value > 0 ? value : ""}</td>
                        <td>{value < 0 ? -(value) : ""}</td>
                        
                    </tr>
                }
            }
        }

    })
    const showLOE = accounts.map((account) => {
        if ((account.ah_id === 2) || (account.ah_id === 3)) {
            const value = account.ac_debit - account.ac_credit
            console.log((account.ac_debit & account.ac_credit))
            if ((account.ac_debit | account.ac_credit) != 0) {

                if (value !== 0) {

                    return <tr key={account.ac_id}>
                        <td></td>
                        <td>{account.ac_name}</td>
                        <td>{value > 0 ? value : ""}</td>
                        <td>{value < 0 ? -(value) : ""}</td>
                        
                    </tr>
                }
            }
        }

    })

    /*useEffect(() => {
        var Rev=0;
        var Exp=0;
        const getNetInc = async () => {
           accounts.map(acc=>{
            if ((acc.ah_id) === 4 || (acc.ah_id === 5)) {
               Rev=Rev+acc.ac_credit;
               Exp=Exp+acc.ac_debit;
              
            }
           })
          
        };
        getNetInc();
        setrev(Rev)
        setexp(Exp)
        setnetIncome(Rev-Exp)
        console.log(Rev)
         console.log(Exp)

       
    }, []);*/

    const totalSum = () => {

        var debs = 0;
        var creds = 0;
        accounts.map(a => {
            if ((a.ah_id) === 4 || (a.ah_id === 5)) {
                const value = a.ac_debit - a.ac_credit
                if (value > 0) {
                    debs += value;
                    console.log(debs)
                }
                else if (value < 0) {
                    creds -=  value;
                    console.log(creds)
                }
               
            }
           
        }
        
        );
        
        
        return (<tr>
            <td></td>
            <td><h4>Total</h4></td>
            <td><h4>{debs}</h4></td>
            <td><h4>{creds}</h4></td>
            <td><h4>Net Income =</h4></td>
            <td><h4>{netIncome}</h4></td>
        </tr>);
    }
    const totalSum1 = () => {

        var debs = 0;
        var creds = 0;
        accounts.map(a => {
            if ((a.ah_id) === 1) {
                const value = a.ac_debit - a.ac_credit
                if (value > 0) {
                    debs = debs + value
                    console.log(debs)
                }
                else if (value < 0) {
                    creds = creds - value
                    console.log(creds)
                }
            }


        });
        return <tr>
            <td></td>
            <td><h4>Total</h4></td>
            <td><h4>{debs-creds}</h4></td>
            <td></td>
        </tr>
    }

    const totalSum2 = () => {

        var debs = 0;
        var creds = 0;
        accounts.map(a => {
            if ((a.ah_id === 2) || (a.ah_id === 3)) {
                const value = a.ac_debit - a.ac_credit
                if (value > 0) {
                    debs = debs + value
                    console.log(debs)
                }
                else if (value < 0) {
                    creds = creds - value
                    console.log(creds)
                }
            }


        });
        return <tr>
            <td></td>
            <td><h4>Total</h4></td>
            <td><h4></h4></td>
            <td><h4>{netIncome+creds-debs}</h4></td>
            
        </tr>
    }



    return (
        <>
            <Container ref={ref}>
                <Row  >
                    <h3 className='m-2 mb-3'>Income Statement</h3>
                    <Table striped bordered>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><h5>Accounts</h5></td>
                                <td><h5>Debit</h5></td>
                                <td><h5>Credit</h5></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <td><h4>Revenues</h4></td>
                            {showRev}
                            <td><h4>Expense</h4></td>
                            {showExp}
                            {totalSum()}

                        </tbody>
                    </Table>

                </Row>
                <Row>
                    <h3 className='m-2 mb-3'>Balance Sheet</h3>
                    <Table striped bordered>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><h5>Accounts</h5></td>
                                <td><h5>Debit</h5></td>
                                <td><h5>Credit</h5></td>
                               
                            </tr>
                            <td><h4>Assets</h4></td>
                            {showAsset}
                            {totalSum1()}
                            <td><h4>L & O.E</h4></td>
                            {showLOE}
                            <tr>
                                <td></td>
                                <td>Net Income</td>
                                <td>{netIncome <0?-(netIncome):""}</td>
                                <td>{netIncome>0?netIncome:""}</td>
                               
                            </tr>                            
                            {totalSum2()}
                            

                        </tbody>
                    </Table>
                </Row>
            </Container>
            <Container>
                <Link to="/alltransaction"><Button variant="success" className="sm m-2" >Back</Button></Link>
                <ReactToPdf targetRef={ref} filename="Financialstatements.pdf" options={options}>
                    {({ toPdf }) => (
                        <Button variant="primary" className="sm m-2" onClick={toPdf}>Download as pdf</Button>
                    )}
                </ReactToPdf>
            </Container>
        </>
    )




}

export default Financialstatement
