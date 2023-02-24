import React from 'react';
import classes from "./SearchedProduct.module.scss"

const SearchedProduct = (props) => {
    return <div className={classes.SearchedProductContainer}>
        <header>{props.name}</header>
        <section>{props.calories} Calories</section>
        <section>Serving size: {props.servingSize} g</section>
        <section>Carbs: {props.carbs} g</section>
        <section>Fat: {props.fat} g</section>
        <section>Protein: {props.protein} g</section>
        <section>Sugar: {props.sugar} g</section>
    </div>
}

export default SearchedProduct;