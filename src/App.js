import React, { Component } from 'react';
import './App.css';

class App extends Component {
  joke = null;

  // Set inital state
  constructor() {
    super();

    this.state = {
      jokes: [],
      isFetchingJoke: false
    };
    
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  // Show joke on load
  componentDidMount() {
    this.searchJokes();
  }

  // Get joke
  searchJokes() {
    this.setState({ isFetchingJoke: true });

    fetch("https://icanhazdadjoke.com/search", {
      method: "GET",
      headers: {
        Accept: "application/json" // Get JSON data
      }
    })
    .then(response => response.json())
    .then(json => {
      const jokes = json.results;
      this.setState({
        jokes,
        isFetchingJoke: false
      });
    });
  }

  onTellJoke() {
    this.searchJokes();
  }

  render() {
    return (
      <main className="content">
        <h1>Random Dad Jokes</h1>

        <form>
          <input type="text" placeholder="Search jokes" />
          <button>Search</button>
        </form>

        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>Tell a joke</button>
        <p className="joke">{this.state.isFetchingJoke ? "Loading..." : this.state.jokes.toString()}</p>
      </main>
    );
  }
}

export default App;
