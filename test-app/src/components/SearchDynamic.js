import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

function SearchDynamic() {

    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    const clearInput = () => {
        setValue([]);
        setResult([]);
      };

    useEffect(() => {
        if(value.length > 0){
            fetch('https://restcountries.com/v2/all')
            .then( response => response.json() )
            .then( responseData => {
                setResult([]);
                let searchQuery = value.toLowerCase();

                for(const key in responseData){
                    let country = responseData[key].name.toLowerCase();
                    if(country.slice(0, searchQuery.length).indexOf(searchQuery) !== -1 ){
                        setResult(prevResult => {
                            return [...prevResult, responseData[key]]
                        });
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            setResult([]);
        }
    }, [value])

    
    return (
        <div className="countrySearch-main">
            <div className="searchInputs">
                <input type="text"
                className="searchBar"
                placeholder="Search Country..."
                onChange={event => setValue(event.target.value)}
                value={value} />
                <div className="searchIcon">
                {result.length === 0 ? (
                    <SearchIcon />
                ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
                </div>
            </div>
            <div className="dropdown">
                {result.map((result, index) => (
                    <div className="dropdown-row" key={index}>
                        <Link to={ "country-details?country=" +  result.alpha2Code.toLowerCase() }>{result.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchDynamic