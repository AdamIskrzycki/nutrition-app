import React from "react";
import classes from "./UserResults.module.scss";

const UserResults = (props) => {
  return (
    <div
      style={{ visibility: props.isUserResultsVisible ? "visible" : "hidden" }}
      className={classes.UserResultsContainer}
    >
      <div className={classes.BmiContainer}>
        <div className={classes.BmiResult}>Your BMI is: {props.bmi}</div>
        <div className={classes.BmiChart}>
          <div className={classes.BmiChartUnderweight}>
            Underweight<br></br>
            <span style={{fontSize: "14px"}}>less than 18.5</span>
          </div>
          <div className={classes.BmiChartNormal}>Normal<br></br>
            <span style={{fontSize: "14px"}}>18.5 - 25</span></div>
          <div className={classes.BmiChartOverweight}>Overweight<br></br>
            <span style={{fontSize: "14px"}}>25 - 30</span></div>
          <div className={classes.BmiChartObese}>Obese<br></br>
            <span style={{fontSize: "14px"}}>more than 30</span></div>
        </div>
      </div>
      <div className={classes.CalorieIntakeContainer}>
        <div className={classes.CalorieHeadline}>Your daily calorie intake for:</div>
        <div className={classes.MaintainWeight}>Weight maintenance: {props.maintainCalorie} calories</div>
        <div className={classes.LoseWeight}>Weight loss: {props.maintainCalorie - 500} calories</div>
        <div className={classes.GainWeight}>Weight gain: {parseInt(props.maintainCalorie) + 500} calories</div>
      </div>
    </div>
  );
};

export default UserResults;
