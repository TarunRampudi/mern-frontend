import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("getFoodToken");
    localStorage.removeItem("getFoodUserName");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your form submission logic here

    // Display a success message
    toast.success(' successfully added!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <>
      <Navbar style={{ backgroundColor: 'green' }} bg="green" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Add other nav items here */}
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ backgroundColor: 'white', padding: '50px', marginTop: '20px',marginLeft:'300px',marginRight:'300px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <h3 style={{color:"black"}}>Items</h3>
            <label htmlFor="id" className="form-label">ID</label>
            <input type="text" className="form-control" id="id" />
          </div>
          <div className="mb-3">
            <label htmlFor="imageLink" className="form-label">Image Link</label>
            <input type="text" className="form-control" id="imageLink" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" />
          </div>
          <div className="mb-3">
            <label htmlFor="subcategory" className="form-label">Subcategory</label>
            <input type="text" className="form-control" id="subcategory" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      


      <div style={{ backgroundColor: 'white', padding: '50px', marginTop: '20px',marginLeft:'300px',marginRight:'300px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <h3 style={{color:"black"}}>Users</h3>
            <label htmlFor="id" className="form-label">Nmae</label>
            <input type="text" className="form-control" id="id" />
          </div>
          <div className="mb-3">
            <label htmlFor="imageLink" className="form-label">Email</label>
            <input type="text" className="form-control" id="imageLink" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Address</label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Password</label>
            <input type="text" className="form-control" id="category" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;