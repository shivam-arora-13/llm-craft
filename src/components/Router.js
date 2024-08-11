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

export default ({ avatarSrc, updateUser, score }) => {
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '1rem'
                }}>
                    <p style={{ margin: '0' }}><strong>{score}</strong> Points</p>
                    <Avatar size="large" src={require(`../avatars/${avatarSrc}`)} />
                </div>
            </Navbar>
        </div>
        <Routes>
            <Route exact path="/" element={<Game updateUser={updateUser} />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
    </>
}