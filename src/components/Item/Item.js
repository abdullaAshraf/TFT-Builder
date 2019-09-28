import React from 'react';
import './Item.css';

const item = (props) => {
    const drag = (event) => {
        event.dataTransfer.setData("text/plain", props.name);
    }

    return (
        <img src={props.iconURL} alt = {props.name} className="ItemClass" draggable = "true" onDragStart = {drag} />
    );
}

export default item;