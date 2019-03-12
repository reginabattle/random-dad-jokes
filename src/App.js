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
      isLoading: false
    };
    
    // Bind handlers to component
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.showJokes = this.showJokes.bind(this);
  }

  // Send search query to API to get jokes
  searchJokes(limit = 20) {
    this.setState({ isLoading: true });

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchQuery}&limit=${limit}`, {
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
        isLoading: false
      });
    });
  }

  onSearchChange(event) {
    this.setState({ searchQuery: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  showJokes() {
    return(
      <ul className="joke__list">
        {this.state.jokes.map(item => <li className="joke" key={item.id}>{item.joke}</li>)}
      </ul>
    )
  }

  render() {
    return (
      <main className="joke__search">
        <h1>Random Dad Jokes</h1>

        <form onSubmit={this.onSearchSubmit}>
          <input type="text" placeholder="Search jokes" onChange={this.onSearchChange}/>
          <button>Search</button>
          <button onClick={() => this.searchJokes(1)} disabled={this.state.isLoading}>Feelin&rsquo; lucky</button>
        </form>

        <h2>Searching for: {this.state.searchQuery}</h2>

        {this.state.isLoading ? 'Loading...' : this.showJokes()}
      </main>
    );
  }
}

export default App;
