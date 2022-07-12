import React from "react";

function Die(props) {
    const styles = {
        backgroundColor: (props.isHeld ? "#59E391" : "#E9E9E9")
    };

    return (
        <div 
            className="die" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-value">{props.value}</h2>
        </div>
    )
}

export default Die;