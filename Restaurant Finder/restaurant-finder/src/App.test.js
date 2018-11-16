import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/*describe('App', () => {
  describe('getRestaurants', () => {
    it('can fetch data from API', async () => {
      const response = await asyncFetch('http://opentable.herokuapp.com/api/restaurants?city=toronto');
      const result = await response.json();
      window.fetch = jest.fn()
                       .mockImplementationOnce(() => ({
                         status: 200,
                         json: () => new Promise((resolve, reject) => {
                           resolve({
                             restaurants: [
                               {name: 'Scaramouche Restaurant', id: 21307}, {name: 'Lula Lounge', id: 75154}
                             ]
                           })
                         })
                       }))
      const renderedComponent = await shallow(<App />)
      await renderedComponent.update()
      expect(renderedComponent.state('restaurants').length).toEqual(2);
      expect(result.restaurants[0].id).toEqual(21307);
    });

    it('sets the state of getRestaurants on error', async() => {
      .mockImplementationOnce(() => ({
        status: 500,
      }))
      const renderedComponent = await shallow(<App />)
      await renderedComponent.update()
      expect(renderedComponent.state('error')).toEqual('Error fetching restaurants');
    })
  })
})*/
