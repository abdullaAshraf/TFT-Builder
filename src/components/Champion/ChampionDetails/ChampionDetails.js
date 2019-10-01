import React from 'react';
import './ChampionDetails.css';

const championDetails = (props) => {
    if (!props.name)
        return (null)

    let desc = props.ability.desc.split('\n');
    let col1 = [];
    let col2 = [];
    for (let i = 1; i < desc.length; i++) {
        if (i % 2 === 1)
            col1.push(<p key={i}>{desc[i]}</p>);
        else
            col2.push(<p key={i}>{desc[i]}</p>);
    }
    return (
        <div className="ChampionDetails">
            <h1>{props.name}</h1>
            <h4> {props.classes.join(',')} </h4>
            <div className="row">
                <div className="col">
                    <p>Health : {props.health.join('/')}</p>
                    <p>Armor : {props.armor}</p>
                    <p>Magic Resist : {props.magicResist}</p>
                </div>
                <div className="col">
                    <p>Attack Damage : {props.damage.join('/')}</p>
                    <p>Attack Speed : {props.attackSpeed}</p>
                    <p>Range : {props.range}</p>
                </div>
            </div>
            <div className="Ability">
                <img src={props.ability.iconURL} alt={props.ability.name} />
                <h3>{props.ability.name}</h3>
                <p>{desc[0]}</p>
                <div className="row">
                    <div className="col">{col1}</div>
                    <div className="col">{col2}</div>
                </div>
            </div>
        </div>
    );
}

export default championDetails;