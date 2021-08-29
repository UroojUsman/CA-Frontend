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

function Postclosing() {
    const [accounts, setAccounts] = useState([]);


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
    const showList = accounts.map((account) => {
        if ((account.ah_id === 1) || (account.ah_id === 2) ||(account.ah_id===3)) {
        const value = account.ac_debit - account.ac_credit
        console.log((account.ac_debit & account.ac_credit))
        if ((account.ac_debit | account.ac_credit) != 0) {

            if (value !== 0) {

                return <tr key={account.ac_id}>
                   
                    <td>{account.ac_name}</td>
                    <td>{value > 0 ? value : ""}</td>
                    <td>{value < 0 ? -(value) : ""}</td>
                </tr>
            }

        }
       
    }
})


    const totalSum = () => {
        var debs = 0;
        var creds = 0;

        accounts.map(a => {
            if ((a.ah_id) === 1 || (a.ah_id === 2) || (a.ah_id===3)) {
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
            <td><h4>Total</h4></td>
            <td><h4>{debs}</h4></td>
            <td><h4>{creds}</h4></td>
        </tr>

    }
    async function newCycle(){
        await fetch("http://127.0.0.1:8000/api/newCycle", {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
      }

    return (
        <>

            <Container ref={ref}>

                <h1 className='m-2 mb-3'>PostClosing Trial & Balance</h1>
                <Table striped bordered>
                    <tbody>
                        <tr>
                            <td><h5>Accounts</h5></td>
                            <td><h5>Debit</h5></td>
                            <td><h5>Credit</h5></td>
                        </tr>
                        {showList}
                        {totalSum()}
                    </tbody>
                </Table>
                

            </Container>
            <Container>
            <Link to="/alltransaction"><Button variant="success" className="sm m-2" >Back</Button></Link>
            <ReactToPdf targetRef={ref} filename="PostClosing.pdf" options={options}>
                {({ toPdf }) => (
                    <Button variant="primary" className="sm m-2" onClick={toPdf}>Download as pdf</Button>
                )}
            </ReactToPdf>
            <Link to="/addaccount"><Button variant="success" className="sm m-2"  onClick={newCycle}>Generate New Cycle</Button></Link>
            </Container>
        </>

    )
}


export default Postclosing
