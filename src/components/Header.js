import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <>
        <div className="container-fluid nav_bg">
            <div className="row">
                <div className="col-10 mx-auto">
                <nav className="navbar navbar-expand-lg navbar-light bg-none">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/Home">Account Management System</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <NavLink className="nav-link" to="/Home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addaccount">Add Account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addtransaction">Add Transaction</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/alltransaction">Transaction</NavLink>
                            </li>
                            
                        </ul>
                       
                    </div>
                </div>
            </nav>
                </div>
            </div>
            
        </div>
        </>
    )
}
export default Header;