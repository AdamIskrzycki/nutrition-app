import React from "react";
import classes from "./Form.module.scss";

const Form = (props) => {
  return (
    <div className={classes.FormContainer}>
      <section className={classes.Info}>
        First, input the information necessary for proper measurements
      </section>
      <label>
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={props.onGenderChange}
          checked={props.gender === "male"}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={props.onGenderChange}
          checked={props.gender === "female"}
        />
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
          className={classes.NumberInput}
        />
      </div>
      <div>
        <label for="height">Height: </label>
        <input type="number" id="height" onChange={props.onHeightChange} className={classes.NumberInput} placeholder="(in cm)"/>
      </div>
      <div>
        <label for="weight">Weight: </label>
        <input type="number" id="weight" onChange={props.onWeightChange} className={classes.NumberInput} placeholder="(in kg)"/>
      </div>
      <div>
        <label for="exercise">How active are you?</label>
        <br></br>
        <select className={classes.SelectInput} id="activity" onChange={() => props.onSelectOptionChange("activity")}>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">
            Lightly active (exercise 1-3 days/week)
          </option>
          <option value="moderatelyActive">
            Moderately active (exercise 3-5 days/week)
          </option>
          <option value="active">Active (exercise 6-7 days/week)</option>
          <option value="veryActive">
            Very active (hard exercise 6-7 days/week)
          </option>
        </select>
      </div>
      <button className={classes.CalculateButton} onClick={props.onCalculateClick}>Calculate</button>
    </div>
  );
};

export default Form;
