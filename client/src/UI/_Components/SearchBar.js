import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = (props) => {
    const [query, onQueryChange] = useState("")
    const history = useHistory();

    //events
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    const search = () => {
        history.replace(`/items?search=`+query);
        props.onSearchChange(query);     
    };
    
    const goToHome = () => {
        history.replace(`/` );
        props.onSearchChange("");
    };

    return (<div className="nav-search">
        <div className="nav-logo" onClick={goToHome} ></div>
        <input className="nav-search-input" placeholder="Nunca dejes de buscar" value={query} onKeyDown={(e) => _handleKeyDown(e)} onChange={(e) => onQueryChange(e.target.value)}></input>
        <button className="nav-search-button" onClick={search}>
            <SearchIcon  style={{opacity:0.5}}></SearchIcon>
        </button>

    </div>)
}

export default SearchBar