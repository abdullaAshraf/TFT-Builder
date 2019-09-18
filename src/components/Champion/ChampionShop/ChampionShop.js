import React from 'react';
import '../../../containers/Shop/Shop.css'

const championShop = (props) => {
    return (
        <div className="Item" onClick={() => props.onClickHandler(props.name)}>
            <div>{props.name}</div>
            <div>
                {props.classes.join()}
            </div>
            <div>{props.cost}</div>
        </div>
    );
}

export default championShop;