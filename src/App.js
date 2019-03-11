import React, { Component } from 'react';
import './App.css';

class App extends Component {
  joke = null;

  // Set inital state
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      jokes: [],
      isFetchingJoke: false
    };
    
    // Bind handlers to component
    this.onTellJoke = this.onTellJoke.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  // Send search query to API to get jokes
  searchJokes() {
    this.setState({ isFetchingJoke: true });

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchQuery}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => response.json())
    .then(json => {
      const jokes = json.results;
      console.log('jokes', jokes)
      this.setState({
        jokes,
        isFetchingJoke: false
      });
    });
  }

  onTellJoke() {
    this.searchJokes();
  }

  onSearchChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  render() {
    return (
      <main className="joke__search">
        <h1>Random Dad Jokes</h1>

        <form onSubmit={this.onSearchSubmit}>
          <input type="text" placeholder="Search jokes" onChange={this.onSearchChange}/>
          <button>Search</button>
          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell joke</button>
        </form>

        <h2>Searching for: {this.state.searchQuery}</h2>

        <ul className="joke__list">
          {this.state.jokes.map(item => <li className="joke">{item.joke}</li>)}
        </ul>

      </main>
    );
  }
}

export default App;
