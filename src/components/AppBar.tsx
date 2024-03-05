import {Link} from "react-router-dom";

const AppBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <h1 className="navbar-brand m-0">Contacts</h1>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className='m-0'>
                            <Link className="nav-item nav-link active" to='new-contact'>Add new contact</Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppBar;