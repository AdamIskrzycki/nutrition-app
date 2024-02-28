import React, { useState } from "react";
import SearchedProduct from "./SearchedProduct/SearchedProduct";
import classes from "./SearchContainer.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Meal from "./Meal/Meal";

import { groupBy } from '../../utils';

const SearchContainer = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [currentProductInfo, setCurrentProductInfo] = useState(null);

  const [breakfastProducts, setBreakfastProducts] = useState({});
  const [brunchProducts, setBrunchProducts] = useState([]);
  const [lunchProducts, setLunchProducts] = useState([]);
  const [supperProducts, setSupperProducts] = useState([]);
  const [dinnerProducts, setDinnerProducts] = useState([]);

  const groupedBreakfast = groupBy(breakfastProducts, "name").sort((a, b) => a.name.localeCompare(b.name));
  const groupedBrunch = groupBy(brunchProducts, "name").sort((a, b) => a.name.localeCompare(b.name));
  const groupedLunch = groupBy(lunchProducts, "name").sort((a, b) => a.name.localeCompare(b.name));
  const groupedSupper = groupBy(supperProducts, "name").sort((a, b) => a.name.localeCompare(b.name));
  const groupedDinner = groupBy(dinnerProducts, "name").sort((a, b) => a.name.localeCompare(b.name));



  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      onSearchClick();
    }
  };

  const setProducts = (productsArray) => {
    const updatedProductsArray = { ...productsArray };
    const productKey = currentProductInfo.name;

    // If the product already exists in updatedProductsArray, update its amount
    if (updatedProductsArray[productKey]) {
      updatedProductsArray[productKey].amount++;
    } else {
      // Otherwise, add a new entry with amount 1
      updatedProductsArray[productKey] = { ...currentProductInfo, amount: 1 };
    }

    return updatedProductsArray
  }

  const onMealButtonClick = (e) => {
    switch (e.target.id) {
      case "Breakfast":
      setBreakfastProducts(setProducts(breakfastProducts));
      break;
      case "Brunch":
        setBrunchProducts(setProducts(brunchProducts));
        break;
      case "Lunch":
        setLunchProducts(setProducts(lunchProducts));
        break;
      case "Supper":
        setSupperProducts(setProducts(supperProducts));
        break;
      case "Dinner":
        setDinnerProducts(setProducts(dinnerProducts));
        break;
      default:
        console.log("No such button");
    }
  };

  const onSearchClick = () => {
    if (inputValue.length > 2) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.calorieninjas.com/v1/nutrition?query=${inputValue}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.REACT_APP_API_KEY,
              },
            }
          );
          const data = await response.json();
          console.log("data: ", data);
          setCurrentProductInfo(data.items[0]);
          console.log("Current product:", currentProductInfo.name);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  };

  return (
    <div className={classes.SearchContainer}>
      <header className={classes.SearchInvitation}>
        Search for a food or drink you want to add to your daily meal plan
      </header>
      <header className={classes.SearchInvitationSHL}>
        Discover their calorific values and macros!
      </header>
      <div className={classes.InputContainer}>
        <input
          className={classes.Search}
          type="text"
          placeholder="Default quantity: 100g"
          onChange={onInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className={classes.SearchButton} onClick={onSearchClick}>
          <SearchIcon disabled={inputValue.length === 0} fontSize="large" />
        </div>
      </div>
      <div className={classes.SearchResultsContainer}>
        {currentProductInfo ? (
          <SearchedProduct
            onMealButtonClick={onMealButtonClick}
            currentProductInfo={currentProductInfo}
          />
        ) : (
          <div
            style={
              currentProductInfo === null
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            Unfortunately, we couldn't find your product
          </div>
        )}
      </div>
      <div className={classes.MealPlanContainer}>
        <Meal mealName="Breakfast" products={groupedBreakfast}/>
        <Meal mealName="Brunch" products={groupedBrunch}/>
        <Meal mealName="Lunch" products={groupedLunch}/>
        <Meal mealName="Supper" products={groupedSupper}/>
        <Meal mealName="Dinner" products={groupedDinner}/>
      </div>
    </div>
  );
};

export default SearchContainer;