import React from 'react';
import './ItemsArea.css';
import Item from '../Item'

const itemsArea = (props) => {
    let mainItems = props.items.filter(item => item.subitems.length == 0);

    return (
        <div className="ItemsArea">
            {mainItems.map(item => <Item key={item.name} {...item} />)}
        </div>
    );
}

export default itemsArea;