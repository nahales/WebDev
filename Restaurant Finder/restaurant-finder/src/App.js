import React, { Component } from 'react';
import Restaurants from './Components/Restaurants';
import Form from './Components/Form';
import './form.css';
import './App.css';

class App extends Component {

  state = {
    restaurants: [],
    isLoaded: false
  }

  getRestaurants = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = `http://opentable.herokuapp.com/api/restaurants?city=${city}`;
    console.log(api_url);
    const api_call = await fetch(api_url);
    const data = await api_call.json();
    if (city) {
      this.setState({
        isLoaded: true,
        restaurants: data.restaurants,
        error: ""
      });
    } else {
      this.setState({
        isLoaded: false,
        restaurants: undefined,
        error: "Please enter a valid city name!"
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Restaurant Finder</h1>
        <Form getRestaurants={this.getRestaurants}/>
        <Restaurants restaurants={this.state.restaurants}/>
        <p className="error">{this.state.error}</p>

      </div>
    );
  }
}

export default App;
