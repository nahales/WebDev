Technical Questions:
1.	How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

10 hours in total. 
I spent 4 hours for coding the application in react and styling it which works properly. 
I spent 6 hours for testing part. Because unfortunately, something’s wrong with my Jest and Babel modules that didn’t allow me to run my test code. I think my test code is right, however I couldn’t run it to make sure. If I had more time, I would fix my Jest’s problem and would make sure my test code works fine.
Also, if I had more time I would add react-json-table to display the result in a nice tabular format.


2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

One of the new features in React which I coded this test with, is getting rid of “constructor” in the class and declaring the “state” directly in the class. For instance in my App.js I’ve coded like below:

class App extends Component {
  state = {
    restaurants: [],
    isLoaded: false
  } 
   /* some code*/
}


Whereas, in previous versions it should be coded like below:

class App extends Component {
    constructor(props) {
    super(props); 
    this.state = {
      restaurants: [],
      isLoaded: false
    };
  }
   /* some code*/
}


3.	How would you track down a performance issue in production? Have you ever had to do this?

There are several points to check in order to resolve a performance issue in production. It could be client side, it could be slow servers, it could be network or busy databases.

I’ve done performance troubleshooting so many times in a network when I was working as a Network Engineer in an Internet Service Provider with millions of users. The issues happened mostly with DNS Servers, DHCP Servers, Databases, User Authentication Servers and sometimes physical fiber connectivity. It also happened for couple of times because of some hacker attack on the network services.

I have never had to do this for application performance yet.


4.	How would you improve the API that you just used?

I would make the search result more accurate. Right now, it returns any city that contains the input characters, for example if user input “ve” it’ll return all the restaurant which are located in the cities whose name contains “ve”. I would make the API result based on the trimmed exact city name.


5.	Please describe yourself using JSON.

Please find “nahal.json” in the project’s main directory (./nahal.json).
