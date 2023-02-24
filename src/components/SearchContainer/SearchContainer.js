import React, { useState, useEffect } from "react";
import SearchedProduct from "./SearchedProduct/SearchedProduct";
import classes from "./SearchContainer.module.scss";

const SearchContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentProductInfo, setCurrentProductInfo] = useState(null);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
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
  }
    


  return (
    <div className={classes.SearchContainer}>
      <header className={classes.SearchInvitation}>
        Search for a food or drink you want to add to your daily meal plan
      </header>
      <header className={classes.SearchInvitationSHL}>
        Discover their calorific values and macros!
      </header>
      <input
        className={classes.Search}
        type="text"
        placeholder="Default quantity: 100g"
        onChange={onInputChange}
      />
      <button onClick={onSearchClick} disabled={inputValue.length === 0}>Search</button>
      <div className={classes.SearchResultsContainer}>
        {currentProductInfo ? (
          <SearchedProduct
            name={currentProductInfo.name}
            calories={currentProductInfo.calories}
            servingSize={currentProductInfo.serving_size_g}
            carbs={currentProductInfo.carbohydrates_total_g}
            fat={currentProductInfo.fat_total_g}
            protein={currentProductInfo.protein_g}
            sugar={currentProductInfo.sugar_g}
          />
        ) : 
        <div style={currentProductInfo === null ? {visibility: "hidden"} : {visibility: "visible"}}>
          Unfortunately, we couldn't find your product
        </div>}
      </div>
    </div>
  );
};

export default SearchContainer;
