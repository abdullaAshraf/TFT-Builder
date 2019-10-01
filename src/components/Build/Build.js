import React from 'react';
import shortid from 'shortid';
import './Build.css';
import { withRouter } from 'react-router-dom'

const build = (props) => {
    props.champions.sort((a, b) => {
        if (a.tier > b.tier)
            return -1;
        if (a.tier < b.tier)
            return 1;
        return 0;
    })

    let champSynergies = {};
    props.champions.forEach(element => {
        element.classes.forEach(group => {
            if (typeof champSynergies[group] === 'undefined')
                champSynergies[group] = [];
            champSynergies[group].push(element.name);
        })
    });

    let synergies = [];
    Object.keys(champSynergies).forEach(key => {
        let synergy = { ...props.synergies.find(element => element.name === key) };
        synergy.count = champSynergies[key].filter(onlyUnique).length;
        synergies.push(synergy);
    });
    synergies = synergies.filter(synergy => synergy.count >= synergy.stages[0]);
    synergies.sort(compare);


    const buildClickHandler = () => {
        const championsCompressed = props.champions.map(champ => {
            return {
                name: champ.name,
                level: champ.level,
                items: champ.items,
                cell: champ.cell
            }
        });
        props.history.push({
            pathname: '/',
            build: props.champions
        })
    }

    return (
        <div onClick={buildClickHandler} className="Build">
            <button onClick={props.removeBuild}>Remove</button>
            <h1>{props.name}</h1>
            <div>
                {props.champions.map(champ => <img key={shortid.generate()} src={champ.iconURL} width="80px" />)}
            </div>
            <div>
                {synergies.map(synergy => <img className="Synergy" key={shortid.generate()} src={synergy.iconURL} />)}
            </div>
        </div>
    );
}

export default withRouter(build);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function compare(a, b) {
    let na = 0, nb = 0;
    while (a.count >= a.stages[na] && na < a.stages.length - 1)
        na++;
    while (b.count >= b.stages[nb] && nb < b.stages.length - 1)
        nb++;
    if (a.stages.length - na < b.stages.length - nb) {
        return -1;
    }
    if (a.stages.length - na > b.stages.length - nb) {
        return 1;
    }
    return nb - na;
}