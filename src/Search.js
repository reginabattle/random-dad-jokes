import React from 'react';

const Search = props => {

	const onSubmit = (event) => {
		event.preventDefault();
		props.onFormSubmit();
	}

	return (
		<form onSubmit={onSubmit}>
	    <input type="text" placeholder="Search jokes" onChange={props.onSearchValueChange}/>
	    <button disabled={props.isSearching}>Search</button>
	    <button onClick={props.onSingleSearch} disabled={props.isSearching}>Feelin&rsquo; lucky</button>
	  </form>
	);
};

export default Search;