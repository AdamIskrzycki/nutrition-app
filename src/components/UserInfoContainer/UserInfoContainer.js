import React, { useState, useEffect } from "react";
import Form from "./Form/Form";
import UserResults from "./UserResults/UserResults";
import classes from "./UserInfoContainer.module.scss";

const UserInfoContainer = () => {
  const [gender, setGender] = useState(null);
  const [ageValue, setAgeValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue, setWeightValue] = useState(0);
  const [bmiValue, setBmiValue] = useState(0);
  const [isUserResultsVisible, setIsUserResultsVisible] = useState(false);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [maintainCalorie, setMaintainCalorie] = useState(0);
  const [isCalculateDisabled, setIsCalculateDisabled] = useState(true);

  useEffect(() => {
    if(gender === null || ageValue < 20 || ageValue > 99 || weightValue < 1 || heightValue < 1 || weightValue > 250 || heightValue > 250) {
      setIsCalculateDisabled(true);
    } else setIsCalculateDisabled(false)
  }, [gender, ageValue, weightValue, heightValue])

  const onGenderChange = (event) => {
    setGender(event.target.value);
  };

  const onAgeChange = (event) => {
    setAgeValue(event.target.value);
  };

  const onHeightChange = (event) => {
    setHeightValue(event.target.value);
  };

  const onWeightChange = (event) => {
    setWeightValue(event.target.value);
  };

  const checkActivitySelection = (id) => {
    const select = document.getElementById(id);

    switch (select.selectedIndex) {
      case 0:
        setSelectedActivityIndex(0);
        break;
      case 1:
        setSelectedActivityIndex(1);
        break;
      case 2:
        setSelectedActivityIndex(2);
        break;
      case 3:
        setSelectedActivityIndex(3);
        break;
      case 4:
        setSelectedActivityIndex(4);
        break;
      default:
        break;
    }
  };

  const calculateCalories = (gender, weight, height, age, exerciseIndex) => {
    let calories = 0;
    let BMR = 0;

    switch (gender) {
      case "male":
        BMR = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
        break;
      case "female":
        BMR = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
        break;
      default:
        break;
    }

    switch (exerciseIndex) {
      case 0:
        calories = BMR * 1.2;
        break;
      case 1:
        calories = BMR * 1.375;
        break;
      case 2:
        calories = BMR * 1.55;
        break;
      case 3:
        calories = BMR * 1.725;
        break;
      case 4:
        calories = BMR * 1.9;
        break;
      default: break;
    }

    return calories;
  };

  const onCalculateClick = () => {
    setIsUserResultsVisible(true);
    setBmiValue((weightValue / Math.pow(heightValue / 100, 2)).toFixed(2));
    setMaintainCalorie(calculateCalories(gender, weightValue, heightValue, ageValue, selectedActivityIndex).toFixed());
  };

  return (
    <>
    <section className={classes.UserInfoContainer}>
      <Form
        gender={gender}
        onGenderChange={onGenderChange}
        onAgeChange={onAgeChange}
        onHeightChange={onHeightChange}
        onWeightChange={onWeightChange}
        onCalculateClick={onCalculateClick}
        onSelectOptionChange={checkActivitySelection}
        isCalculateDisabled={isCalculateDisabled}
      />
      <UserResults bmi={bmiValue} isUserResultsVisible={isUserResultsVisible} maintainCalorie={maintainCalorie}/>
    </section>
    <div className={classes.SearchInvitation}>Search for different foods and drinks and discover their calorific values below!</div>
    </>
  );
};

export default UserInfoContainer;
