import React from 'react';
import '../../../containers/Shop/Shop.css'

const championShop = (props) => {
    return (
        <div className="Item" onClick={() => props.onClickHandler(props.name)}>
            <div className="ImageHolder">
                <img src = {props.shopIconUrl} alt = {props.name} draggable="false"></img>
            </div>
            <ul className="ChampClasses">
                {props.classes.map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className="ChampName">{props.name}</div>
            <div className="ChampTier">{props.tier}</div>
        </div>
    );
}

export default championShop;