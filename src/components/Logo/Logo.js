import React from 'react';
import tftLogo from '../../assets/images/logo-hero.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height:props.height}}>
        <img src={tftLogo} alt="TFT LOGO" />
    </div>
);

export default logo;