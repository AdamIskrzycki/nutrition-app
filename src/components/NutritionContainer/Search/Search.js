import React from 'react';
import classes from './Search.module.scss'

const Search = () => {
    return <div>
        <input className={classes.Search} type="text" placeholder='Search for foods!'/>
    </div>
}

export default Search;