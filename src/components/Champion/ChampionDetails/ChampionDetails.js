import React from 'react';

const championDetails = (props) => {
    let classes = null;
    if (props.classes != null)
        classes = props.classes.map(item => {
            return <li key={item}>{item}</li>
        });
    return (
        <div>
            <h3>{props.name}</h3>
            <p>{props.ability}</p>
            <ul>
                {classes}
            </ul>
        </div>
    );
}

export default championDetails;