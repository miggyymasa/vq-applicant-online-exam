import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

/* Import Style */
import './styles/app.scss';


/* Import Components */
import App from './App';

ReactDOM.render( 
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
)