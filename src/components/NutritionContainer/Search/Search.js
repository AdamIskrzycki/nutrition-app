import React, { useEffect, useState } from "react";
import classes from "./Search.module.scss";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [productsNutritionInfo, setProductsNutritionInfo] = useState([]);

  useEffect(() => {
    if (inputValue.length > 2) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://trackapi.nutritionix.com/v2/search/instant?query=${inputValue}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-app-id": "8bbbd53d",
                "x-app-key": "9af9c44fb489d66cdd442edaf44eca50",
              },
            }
          );
          const data = await response.json();
          console.log("data", data);
          setProducts(data.common.slice(0, 8));
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    products.map(el => {
      const postFoodName = async () => {
        try {
          const response = await fetch(
            `https://trackapi.nutritionix.com/v2/natural/nutrients?query=${el.food_name}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-app-id": "8bbbd53d",
                "x-app-key": "9af9c44fb489d66cdd442edaf44eca50",
              },
              body: (JSON.stringify({ 
                "query": el.food_name
                }))
            }
          );
          const data = await response.json();
          
          setProductsNutritionInfo(...productsNutritionInfo, data.foods) // check if the combining requests approach works - in return change to map over productsNutritionInfo
          console.log("ProductsNutritionInfo:", productsNutritionInfo); // also check in the console if state productsNutritionInfo has appropriate info to be displayed
        } catch (err) { //try to find solution to not exceed daily requests limit on API - currently sending too many requests at once
          console.log(err);
        }
      }

      postFoodName();

    })
  }, [products])

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        className={classes.Search}
        type="text"
        placeholder="Search for foods!"
        onChange={onInputChange}
      />
         <div className={classes.SearchResultsContainer}>
          {products.length > 0 ? products.map((el) => {
            return <div className={classes.SearchResult}>
                {el.food_name}
              </div>
          }) : null}
        </div> 
    </div>
  );
};

export default Search;
