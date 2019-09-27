import React from 'react';
import './SynergiesArea.css';
import Synergey from '../Synergy'

function compare(a, b) {
    let na = 0, nb = 0;
    while (a.count >= a.stages[na] && na < a.stages.length - 1)
        na++;
    while (b.count >= b.stages[nb] && nb < b.stages.length - 1)
        nb++;
    if (a.stages.length  - na < b.stages.length  - nb) {
        return -1;
    }
    if (a.stages.length  - na > b.stages.length  - nb) {
        return 1;
    }
    return nb - na;
}

const synergiesArea = (props) => {
    props.synergies.sort(compare);
    return (
        <div className="SynergyArea">
            {props.synergies.map(synergy => <Synergey key={synergy.name} {...synergy} />)}
        </div>
    );
}

export default synergiesArea;