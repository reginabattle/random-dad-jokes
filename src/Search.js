import React from 'react';

const Search = props => (
	<form onSubmit={props.onFormSubmit}>
    <input type="text" placeholder="Search jokes" onChange={props.onSearchValueChange}/>
    <button disabled={props.isSearching}>Search</button>
    <button onClick={props.onSingleSearch} disabled={props.isSearching}>Feelin&rsquo; lucky</button>
  </form>
);

export default Search;