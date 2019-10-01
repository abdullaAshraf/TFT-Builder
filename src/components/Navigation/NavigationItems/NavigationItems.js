import React from 'react';
import './NavigationItems.css';
import {NavLink} from 'react-router-dom';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavLink to="/" exact>Buidler</NavLink>
        <NavLink to="/Builds">Builds</NavLink>
    </ul>
);

export default navigationItems;