import React from 'react';

const championDetails = (props) => {
    if (!props.name)
        return (null)
    let classes = null;
    classes = props.classes.map(item => {
        return <li key={item}>{item}</li>
    });

    let desc = props.ability.desc.split('\n');
    let col1 = [];
    let col2 = [];
    for (let i = 1; i < desc.length; i++) {
        if (i % 2 === 1)
            col1.push(<p key = {i} style={{ 'margin': '0px'}}>{desc[i]}</p>);
        else
            col2.push(<p key = {i} style={{ 'margin': '0px'}}>{desc[i]}</p>);
    }
    return (
        <div>
            <h1>{props.name}</h1>
            <ul>
                {classes}
            </ul>
            <p style={{ 'margin': '0px'}}>Health : {props.health.join('/')}</p>
            <p style={{ 'margin': '0px'}}>Armor : {props.armor}</p>
            <p style={{ 'margin': '0px'}}>Magic Resist : {props.magicResist}</p>
            <p style={{ 'margin': '0px'}}>Attack Damage : {props.damage.join('/')}</p>
            <p style={{ 'margin': '0px'}}>Attack Speed : {props.attackSpeed}</p>
            <p style={{ 'margin': '0px'}}>Range : {props.range}</p>
            <div>
                <img src={props.ability.iconURL} alt={props.ability.name} />
                <h2>{props.ability.name}</h2>
                <p>{desc[0]}</p>
                <div style={{ 'float': 'left', 'width': '50%'}}>{col1}</div>
                <div style={{ 'float': 'right', 'width': '50%'}}>{col2}</div>
            </div>
        </div>
    );
}

export default championDetails;