import React from 'react';

class Form extends React.Component {

  render() {
    return (
      <form onSubmit={this.props.getRestaurants}>
        <p>Please enter a city</p>
        <input type='text' name="city" placeholder="City..."/>
        <button>Find restaurants</button>
      </form>
    );
  }

};

export default Form;
