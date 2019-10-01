import React from 'react';
import './SynergiesArea.css';
import Synergey from '../Synergy'
import Spinner from '../../UI/Spinner/Spinner'

function compare(a, b) {
    let na = 0, nb = 0;
    while (a.count >= a.stages[na] && na < a.stages.length - 1)
        na++;
    while (b.count >= b.stages[nb] && nb < b.stages.length - 1)
        nb++;

    if(na === 0 && nb > 0)
        return 1;
    if(nb === 0 && na > 0)
        return -1;
    if (a.stages.length - na < b.stages.length - nb) {
        return -1;
    }
    if (a.stages.length - na > b.stages.length - nb) {
        return 1;
    }
    return nb - na;
}

const synergiesArea = (props) => {
    let synergies = <Spinner />
    if (props.synergies && (props.synergies.length === 0 || props.synergies[0].stages)) {
        props.synergies.sort(compare);
        synergies = props.synergies.map(synergy => <Synergey key={synergy.name} {...synergy} />);
    }
    return (
        <div className="SynergyArea">
            {synergies}
        </div>
    );
}

export default synergiesArea;