import React from 'react';
import './Champion.css'

const champion = (props) => {
    let stars = '';
    for(let i =0; i<props.level; i++)
        stars = stars + '★';

    const drag = (event) => {
        event.dataTransfer.setData("text/plain", props.cell);
    }

    return (
        <div onClick = {() => props.champClickHandler(props.name)} draggable = "true" onDragStart = {drag} >
            <div className='GridImageHolder'>
                <img src ={props.iconURL} alt = {props.name} draggable = "false"></img>
            </div>
            <div className = 'GridChampLevel'>{stars}</div>
            <div className = 'GridChampItems'>
                {props.items.join()}
            </div>
        </div>
    );
}

export default champion;