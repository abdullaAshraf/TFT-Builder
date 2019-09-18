import React from 'react';

const champion = (props) => {
    return (
        <div onClick = {() => props.champClickHandler(props.name)}>
            <div>{props.name} - {props.level}</div>
            <div>
                {props.items.join()}
            </div>
        </div>
    );
}

export default champion;