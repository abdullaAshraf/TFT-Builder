import React from 'react';
import './Champion.css'

const champion = (props) => {
    let stars = '';
    for(let i =0; i<props.level; i++)
        stars = stars + '★';

    const drag = (event) => {
        event.dataTransfer.setData("text/plain", props.cell);
    }

    let centerItems = 0;
    if(props.items.length == 1)
        centerItems = 30;
    else if(props.items.length == 2)
        centerItems = 15;

    return (
        <div onClick = {() => props.champClickHandler(props.name)} draggable = "true" onDragStart = {drag} >
            <div className='GridImageHolder'>
                <img src ={props.iconURL} alt = {props.name} draggable = "false"></img>
            </div>
            <div className = 'GridChampLevel'>{stars}</div>
            <div className = 'GridChampItems' style = {{marginLeft:centerItems}}>
                {props.items.map(itemURL => <img key = {itemURL} src = {itemURL} draggable = {false}/>)}
            </div>
        </div>
    );
}

export default champion;