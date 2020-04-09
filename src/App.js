import React, { useState } from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState('');

    const APP_ID = 'bb11a6e3';
    const APP_KEY = 'aeca979120b38293ed686ed37dc6defe';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        if (query) {
            const result = await Axios.get(url);
            if (!result.data.more) {
                return setAlert('No food with such name');
            }
            setRecipes(result.data.hits);
            console.log(result);
            setAlert('');
            setQuery('');
        } else {
            setAlert('Please fill the form');
        }
    };

    const onChange = event => {
        setQuery(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        getData();
    };

    return (
        <div className='App'>
            <h1>Food Searching App</h1>
            <form className='search-form' onSubmit={onSubmit}>
                {alert.length !== 0 && <Alert alert={alert} />}
                <input type='text' placeholder='Search Food' autoComplete='off' onChange={onChange} value={query} />
                <input type='submit' value='search' />
            </form>
            <div className='recipes'>
                {recipes.length !== 0 && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
        </div>
    );
};

export default App;