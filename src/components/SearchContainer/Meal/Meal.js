import React from "react";
import classes from "./Meal.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Meal = (props) => {
  return (
    <section className={classes.Meal}>
      <section className={classes.mealName}>{props.mealName}</section>
      {props.products.map((el) => {
        return (
          <section className={classes.MealProduct}>
              <section className={classes.NameAmountContainer}>
                <section className={classes.ProductName}>{el.name}</section>
                <section>x{el.count}</section>
              </section>
              <section>
                Serving size:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.serving_size_g.toFixed()} g
                </span>
              </section>
              <section>
                Calories:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.calories.toFixed()}
                </span>
              </section>
              <section>
                Carbs:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.carbohydrates_total_g} g
                </span>
              </section>
              <section>
                Fat:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.fat_total_g} g
                </span>
              </section>
              <section>
                Protein:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.protein_g} g
                </span>
              </section>
              <section>
                Sugar:{" "}
                <span style={{ textShadow: "1px 1px #000" }}>
                  {el.sugar_g} g
                </span>
              </section>
              <section className={classes.ButtonContainer}>
                <AddIcon />
                <RemoveIcon />
              </section>
            
            
          </section>
        );
      })}
    </section>
  );
};

export default Meal;
