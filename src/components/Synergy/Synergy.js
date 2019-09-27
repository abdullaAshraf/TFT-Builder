import React from 'react';
import './Synergy.css';

const synergy = (props) => {
    let nexStage = 0;
    while (props.count >= props.stages[nexStage] && nexStage < props.stages.length - 1)
        nexStage++;

    let classes = "SynergyItem row";
    if (nexStage === 0)
        classes += " SynergyGrayed"

    return (
        <div className={classes}>
            <div className="col-3 Tint">
                <img src={props.iconURL} alt={props.name} />
            </div>
            <div className="col-9">
                <h3>{props.name}</h3>
                <p>{props.count} / {props.stages[nexStage]}</p>
            </div>
        </div>
    );
}

export default synergy;