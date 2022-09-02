import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

  // A custom hook that builds on useLocation to parse
  // the query string for you.
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Child({ countrycode }) {

    const [results, setResult] = useState({});
    //const {name, capital, flags} = results;

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/'), [history]);

    useEffect(() => {
        fetchData()
        console.log(results);
      }, [])

    const fetchData = async () => {
       const {data} = await axios.get('https://restcountries.com/v2/alpha/'+ countrycode)
       setResult(data);
    }

    return (
      <Card className="country-detail-wrap">
        <CardActionArea>
          <CardMedia
            className="country-flag"
            image={results.flag}
            title={results.alpha2Code}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {results.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              <ul>
                  <li>Capital: {results.capital}</li>
                  <li>Region: {results.region}</li>
                  <li>Population: {results.population}</li>
              </ul>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOnClick}>
            Back
          </Button>
        </CardActions>
      </Card>
    );
}

function SearchResultSingle() {
    let query = useQuery();

    return(
        <div className="search-result-single-main">
            <Child countrycode={query.get("country")} />
        </div>
    )
}

export default SearchResultSingle