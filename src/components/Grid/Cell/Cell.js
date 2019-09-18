import React from 'react';
import './Cell.css';

const cell = (props) => {
    return (
        <div className = "hexagon">
            {props.children}
        </div>
    );
};

export default cell;