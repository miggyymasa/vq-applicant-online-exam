import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchDynamic from './components/SearchDynamic';
import SearchResultSingle from './components/SearchResultSingle';

function App(){

    return(
        <div className="app-main">
            <div className='header'></div>
            <Switch>
                <Route exact path="/">
                    <SearchDynamic />
                </Route>
                <Route exact path="/country-details">
                    <SearchResultSingle />
                </Route>
            </Switch>
        </div>
    )
}

export default App