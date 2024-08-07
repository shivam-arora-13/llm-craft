import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import Leaderboard from './Leaderboard';
import Game from './Game';

export default () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return  <>
    <div>
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">LLM Craft</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Game</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    <Routes>
        <Route exact path="/" element={<Game/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
    </Routes>
  </>
}