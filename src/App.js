import React, { Component } from 'react';
import './App.css';

class App extends Component {
  joke = null;

  // Set inital state
  constructor() {
    super();

    this.state = {
      joke: null,
      isFetchingJoke: false
    };
    
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  // Show joke on load
  componentDidMount() {
    this.fetchJoke();
  }

  // Get joke
  fetchJoke() {
    this.setState({ isFetchingJoke: true });

    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json" // Get JSON data
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        joke: json.joke, // Fetch a new joke
        isFetchingJoke: false // Check if fecthing joke
      });
    });
  }

  onTellJoke() {
    this.fetchJoke();
  }

  render() {
    return (
      <main className="content">
        <h1>Random Dad Jokes</h1>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}>
          Tell a joke
        </button>
        <p className="joke">
          {this.state.isFetchingJoke ? "Loading..." : this.state.joke}
        </p>
      </main>
    );
  }
}

export default App;
