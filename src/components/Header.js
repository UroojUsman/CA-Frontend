import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                
                    <Navbar.Brand href="#home">Account Management System</Navbar.Brand>
                    <Nav className="mr-auto nav_bar_wrapper">
                        <Link to="/addaccount">Add New Account</Link>
                        <Link to ="/addtransaction">Add Transaction</Link>
                    </Nav>
                
            </Navbar>
        </div>
    )
}
export default Header;