import React from 'react';
import './NavigationItems.css'

const navigationItems = () => (
    <ul className="NavigationItems">
        <a href="/" className="active">Home</a>
        <a href="/">Hints</a>
        <a href="/">Builds</a>
    </ul>
);

export default navigationItems;