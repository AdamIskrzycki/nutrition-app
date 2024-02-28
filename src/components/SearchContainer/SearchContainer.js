import React, { useState } from "react";
import SearchedProduct from "./SearchedProduct/SearchedProduct";
import classes from "./SearchContainer.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import Meal from "./Meal/Meal";

import { groupBy } from '../../utils';

const SearchContainer = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [currentProductInfo, setCurrentProductInfo] = useState(null);

  const [breakfastProducts, setBreakfastProducts] = useState([]);
  const [brunchProducts, setBrunchProducts] = useState([]);
  const [lunchProducts, setLunchProducts] = useState([]);
  const [supperProducts, setSupperProducts] = useState([]);
  const [dinnerProducts, setDinnerProducts] = useState([]);

  const [currentBreakfastProductCount, setCurrentBreakfastProductCount] = useState(0)
  const [currentBrunchProductCount, setCurrentBrunchProductCount] = useState(0)

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

  const calculateProductCount = (productsArray) => { // does not work at all

    let count = 1
    let newCount = 1
    let newProduct = false

    for(let i = 0; i < productsArray.length; i++) {
        if(productsArray[i].name === currentProductInfo.name) {
          count++
        } else { //else if (productsArray[i].name !== productsArray[i-1].name) does not work
          newProduct = true
          newCount++
        }
  }

  return newProduct ? newCount : count
}

  // const addProducts = (currentProduct) => {
    
  //   // maybe try adding products to separate arrays (like one array of apples for breakfast, one array of pears for breakfast and so on) - get the length of it as count
  //   console.log('cur prod', currentProduct)
  //   let currentProductArray = []
  //   currentProductArray = [currentProductArray, currentProduct]
  //   setBreakfastProducts(currentProductArray)
  //   setCurrentBreakfastProductCount(currentProductArray.length)

    
  // }

    // for(let i = 0; i < productsArray.length; i++) {
    //   if(productsArray[i].name === currentProductInfo.name) {
    //     count++
    //   }
      // } else { //else if (productsArray[i].name !== productsArray[i-1].name) does not work
      //   newProduct = true
      //   //newCount++
      // }
  //   }

  //   return 0
  // }

// if an item exists in an array, increment the counter, otherwise set it to one??? It wont really work because a counter is exclusive for every product
// maybe you should check how many items of the same name are in the array and update the counter

// try with eval() function - creating dynamic variable that stores the product count, when the product's name changes -> then passing it as props

  const onMealButtonClick = (e) => {
    switch (e.target.id) {
      case "Breakfast":
        console.log(e.target.id)
        //addProducts(currentProductInfo)
        setCurrentBreakfastProductCount(calculateProductCount(breakfastProducts, currentProductInfo))
        setBreakfastProducts([...breakfastProducts, currentProductInfo]); // this approach adds the counter properly, but when other product is added to the same meal
    
        console.log("Breakfast Products: ", breakfastProducts);
        console.log("count:", currentBreakfastProductCount)
        break;
      case "Brunch":
        setBrunchProducts([...brunchProducts, currentProductInfo]);
        setCurrentBrunchProductCount(currentBrunchProductCount + 1)

        console.log("Brunch Products: ", brunchProducts);
        console.log("count:", currentBrunchProductCount) 
        break;
      case "Lunch":
        setLunchProducts([...lunchProducts, currentProductInfo]);
        console.log("Lunch Products: ", lunchProducts);
        console.log("count:", currentProductInfo.count) // this was the previous approach, but it is still basically the same problem, which is that the counter
        break;                                          // doesn't stay at the specific product count, but on current product count
      case "Supper":
        setSupperProducts([...supperProducts, currentProductInfo]);
        console.log("Supper Products: ", supperProducts);
        console.log("count:", currentProductInfo.count)
        break;
      case "Dinner":
        setDinnerProducts([...dinnerProducts, currentProductInfo]);
        console.log("Dinner Products: ", dinnerProducts);
        console.log("count:", currentProductInfo.count)
        break;
      default:
        console.log("No such button");
    }
    console.log(e.target.id, "Button");
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
        <Meal mealName="Breakfast" products={groupedBreakfast} currentProductCount={currentBreakfastProductCount}/>
        <Meal mealName="Brunch" products={groupedBrunch} currentProductCount={currentBrunchProductCount}/>
        <Meal mealName="Lunch" products={groupedLunch} currentProductCount={currentBrunchProductCount}/>
        <Meal mealName="Supper" products={groupedSupper} currentProductCount={currentBrunchProductCount}/>
        <Meal mealName="Dinner" products={groupedDinner} currentProductCount={currentBrunchProductCount}/>
      </div>
    </div>
  );
};

export default SearchContainer;