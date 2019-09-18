import React from 'react';

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'


const toolbar = (props) => (
    <header className="Toolbar"> 
        <div onClick = {props.openSideDrawer} className="MobileOnly">MENU</div>
        <Logo height = "80%"/>
         <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;