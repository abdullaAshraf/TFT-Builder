import React from 'react';

import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxilliary'

const sidebar = (props) => {
    const attachedClasses = ["SideDrawer",props.show ? "Open" : "Close"];
    return (
        <Aux>
            <Backdrop show = {props.show} clicked ={props.sideDrawerClosed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sidebar; 