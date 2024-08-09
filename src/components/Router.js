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
import { Avatar } from 'antd';

export default ({ avatarSrc }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return <>
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">LLM Craft</NavbarBrand>
                {/* COMMENT START HERE */}
                {/* <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Game</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse> */}
                {/* COMMENT END HERE */}
                <Avatar size="large" src={require(`../avatars/${avatarSrc}`)} />
            </Navbar>
        </div>
        <Routes>
            <Route exact path="/" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
    </>
}