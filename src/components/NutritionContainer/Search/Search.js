import React, {useEffect, useState} from 'react';
import classes from './Search.module.scss'

const Search = () => {

    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (inputValue.length > 2) {
          const fetchData = async () => {
            try {
              const response = await fetch(
                `https://trackapi.nutritionix.com/v2/search/instant?query=${inputValue}`,
                {
                  method: "GET",
                  headers: {
                    'Content-Type': 'application/json', 
                    'x-app-id':'8bbbd53d', 
                    'x-app-key':'9af9c44fb489d66cdd442edaf44eca50'
                  }
                }
              );
              const data = await response.json();
              console.log('response', response);
              console.log('data: ', data);
            } catch (err) {
              console.log(err);
            }
          };
    
          fetchData();
        }
      }, [inputValue]);

    const onInputChange = (e) => {
        setInputValue(e.target.value)
        console.log(inputValue)
    }

    return <div>
        <input className={classes.Search} type="text" placeholder='Search for foods!' onChange={onInputChange}/>
    </div>
}

export default Search;