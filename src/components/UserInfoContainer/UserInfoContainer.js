import React, { useState, useEffect } from "react";
import Form from "./Form/Form";
import UserResults from "./UserResults/UserResults";
import classes from "./UserInfoContainer.module.scss";

const UserInfoContainer = () => {
  const [ageValue, setAgeValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [bmiValue, setBmiValue] = useState(0);
  const [isUserResultsVisible, setIsUserResultsVisible] = useState(false);

  useEffect(() => {
    setBmiValue((weightValue / Math.pow(heightValue / 100, 2)).toFixed(2));
  }, [heightValue, weightValue]);

  const onAgeChange = (event) => {
    setAgeValue(event.target.value);
    console.log("Age: ", ageValue);
  };

  const onHeightChange = (event) => {
    setHeightValue(event.target.value);
    console.log("Height: ", heightValue);
  };

  const onWeightChange = (event) => {
    setWeightValue(event.target.value);
    console.log("Weight: ", weightValue);
  };

  const onCalculateClick = () => {
    setIsUserResultsVisible(true);
  };

  return (
    <div className={classes.UserInfoContainer}>
      <Form
        onAgeChange={onAgeChange}
        onHeightChange={onHeightChange}
        onWeightChange={onWeightChange}
        onCalculateClick={onCalculateClick}
      />
      <UserResults
        bmi={bmiValue}
        isUserResultsVisible={isUserResultsVisible}
      />
    </div>
  );
};

export default UserInfoContainer;
