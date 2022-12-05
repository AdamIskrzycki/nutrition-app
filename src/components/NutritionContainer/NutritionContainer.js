import React from "react";
import Search from "./Search/Search";
import classes from './NutritionContainer.module.scss';

const NutritionContainer = () => {
  return <div className={classes.NutritionContainer}>
    <Search />
  </div>;
};

export default NutritionContainer;
