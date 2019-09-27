import React from 'react';
import './ItemArea.css';
import Item from '../Item'

const itemsArea = (props) => {
    return (
        <div className="ItemsArea">
            {props.items.map(item => <Item key={item.name} {...item} />)}
        </div>
    );
}

export default synergiesArea;