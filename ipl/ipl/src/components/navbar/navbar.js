import React from "react"
import Logo from "../../assets/icon/Logo"
import "./Navbar.css"
import {Navbar,Nav,NavDropdown} from "react-bootstrap"
import {NavLink} from "react-router-dom"

class Navigation extends React.Component{
   render(){

      return(
         <React.Fragment>
           <div className="container-fluid px-0 bg-dark border">
           
            <Navbar className="navigation"  collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand className=" brand px-0 " ><NavLink to="/"><Logo></Logo></NavLink></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link className="link" ><NavLink className="link" to="/">Home</NavLink></Nav.Link>
      
      <NavDropdown className="text-info" title="Navigate" id="collasible-nav-dropdown">
        
        <NavDropdown.Item ><NavLink  to="/economy">Best Economy</NavLink> </NavDropdown.Item>
        <NavDropdown.Item ><NavLink to="/runs">Extra Runs</NavLink></NavDropdown.Item>
        <NavDropdown.Item ><NavLink to="/wins">Wins</NavLink></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item ></NavDropdown.Item>
      </NavDropdown>
      <Nav.Link  className="link"><NavLink className="link" to="/about">About</NavLink></Nav.Link>
    </Nav>
    <Nav>
      
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
         </React.Fragment>
         
      )
   }

}

export default Navigation