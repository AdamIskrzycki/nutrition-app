import React from "react";
import classes from "./SearchedProduct.module.scss";

const SearchedProduct = (props) => {
  return (
    <div className={classes.SearchedProductContainer}>
      <section>
        <header className={classes.ProductName}>{props.currentProductInfo.name}</header>
        <section className={classes.ProductNutritionProperty}>
          Serving size:{" "}
          <span style={{ textShadow: "1px 1px #000" }}>
            {props.currentProductInfo.serving_size_g.toFixed()} g
          </span>
        </section>
        <section className={classes.ProductNutritionProperty}>
          Calories:{" "}
          <span style={{ textShadow: "1px 1px #000" }}>{props.currentProductInfo.calories.toFixed()}</span>
        </section>
        <section className={classes.ProductNutritionProperty}>
          Carbs:{" "}
          <span style={{ textShadow: "1px 1px #000" }}>{props.currentProductInfo.carbohydrates_total_g} g</span>
        </section>
        <section className={classes.ProductNutritionProperty}>
          Fat: <span style={{ textShadow: "1px 1px #000" }}>{props.currentProductInfo.fat_total_g} g</span>
        </section>
        <section className={classes.ProductNutritionProperty}>
          Protein:{" "}
          <span style={{ textShadow: "1px 1px #000" }}>{props.currentProductInfo.protein_g} g</span>
        </section>
        <section className={classes.ProductNutritionProperty}>
          Sugar:{" "}
          <span style={{ textShadow: "1px 1px #000" }}>{props.currentProductInfo.sugar_g} g</span>
        </section>
      </section>
      <section className={classes.AddToMealPlanContainer}>
        <header className={classes.AddHeader}>Add to: </header>
        <button className={classes.MealAddButton} id="Breakfast" onClick={props.onMealButtonClick}>Breakfast</button>
        <button className={classes.MealAddButton} id="Brunch" onClick={props.onMealButtonClick}>Brunch</button>
        <button className={classes.MealAddButton} id="Lunch" onClick={props.onMealButtonClick}>Lunch</button>
        <button className={classes.MealAddButton} id="Supper" onClick={props.onMealButtonClick}>Supper</button>
        <button className={classes.MealAddButton} id="Dinner" onClick={props.onMealButtonClick}>Dinner</button>
      </section>
    </div>
  );
};

export default SearchedProduct;