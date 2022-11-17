import React from "react";
import classes from "./Form.module.scss";

const Form = (props) => {
  return (
    <div className={classes.FormContainer}>
      <section>
        First, input the information necessary for proper measurements
      </section>
        <label>
          <input type="radio" name="sex" id="Male" value="Male" />
          Male
        </label>
        <label>
          <input type="radio" name="sex" id="Female" value="Female" />
          Female
        </label>
        <div>
          <label for="height">Age: </label>
          <input
            type="number"
            id="age"
            min="20"
            max="99"
            placeholder="range: 20-99"
            onChange={props.onAgeChange}
          />
        </div>
        <div>
          <label for="height">Height (in cm): </label>
          <input type="number" id="height" onChange={props.onHeightChange} />
        </div>
        <div>
          <label for="weight">Weight (in kg): </label>
          <input type="number" id="weight" onChange={props.onWeightChange} />
        </div>
        <button onClick={props.onCalculateClick}>Calculate</button>
    </div>
  );
};

export default Form;
