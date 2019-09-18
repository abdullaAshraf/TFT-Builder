import React from 'react';
import Cell from './Cell/Cell'
import Champion from '../Champion/Champion'
import './Cell/Cell.css'

const grid = (props) => {

    let cells = [];
    for (let i = 0; i<21; i++)
        cells.push(<Cell key={"cell_id" + i}></Cell>);
    
    props.champions.forEach(element => {
        cells[element.cell] = <Cell key={"cell_id" + element.cell}><Champion champClickHandler={props.champClickHandler} {...element}/></Cell>;
    });

    return (
        <main className = "hexagon-container">
            {cells}
        </main>
    );
};

export default grid;