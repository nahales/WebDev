import React, { Component } from 'react';
class RestaurantItem extends Component {

  render() {
    return (
      <ul className="Restaurant">
        <li className="RestaurantName">{this.props.restaurant.name}</li>
        <li>Address: {this.props.restaurant.address}</li>
        <li>Price: {this.props.restaurant.price}</li>
      </ul>
    );
  }
}

export default RestaurantItem;
