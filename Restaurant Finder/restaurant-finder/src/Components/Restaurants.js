import React, { Component } from 'react';
import RestaurantItem from './RestaurantItem'

class Restaurants extends Component {
  render() {
    let restaurantItems;
    if(this.props.restaurants) {
      restaurantItems = this.props.restaurants.map((restaurant) => {
        return (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        );
      });
    }
    console.log(this.props);
    return (
      <div className="Restaurants">
        {restaurantItems}
      </div>
    );
  }
}

export default Restaurants;
