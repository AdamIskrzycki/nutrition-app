import React from 'react';

const UserResults = (props) => {
    return <div style={{visibility: props.isUserResultsVisible ? "visible" : "hidden"}}>
        <div>Your BMI is: {props.bmi}</div>
        <div>THIS IS YOUR CALORIE INTAKE RESULT: {props.maintainCalorie}</div>
    </div>
}

export default UserResults;