import React from 'react';
import './Cell.css';

const cell = (props) => {

    const allowDrop = (event) => {
        event.preventDefault();
    }

    const drop = (event) => {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        if (!isNaN(data) || data > 20 || data < 0)
            props.swapCells(props.num, data);
    }

    return (
        <div className="hexagon" onDragOver={allowDrop} onDrop={drop}>
            {props.children}
        </div>
    );
};

export default cell;