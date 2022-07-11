# MidWay 🧭

MidWay is a web application that computes a rough midpoint of two addresses and gathers locations of popular businesses around the midpoint for friends to meet and try together. With the purpose of reducing the time spent on traveling and more time hanging out and exploring with friends. Test it out: [Live Demo](<ADDRESS>).

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. 

### Prerequisites

To run this application locally on your computer, you'll need `Git` and `Node.js` (which comes with `npm`) installed on your computer. Additionally, you would need to sign up to and generate API keys from [Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key#creating-api-keys), [Yelp](https://www.yelp.com/developers/documentation/v3/authentication), and [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities).

### Installing

 Then run the following command in the command line and go to the desired directory to store this project:

Clone this repository

    git clone https://github.com/JonathanCen/MidWay.git

Go into the repository

    cd MidWay

Install all dependicies

    npm install

Go into the back-end directory

    cd midwaybackend

Install all dependicies

    npm install

Then create a new `.env` file in the current directory and add these local variables with your API keys. For more information about the API keys go to the prerequisites

``` 
GOOGLE_MAPS_API_KEY=REPLACE_THIS_WITH_YOUR_GOOGLE_MAPS_API_KEY
YELP_API_KEY=REPLACE_THIS_WITH_YOUR_YELP_API_KEY
YELP_API_CLIENT_ID=REPLACE_THIS_WITH_YOUR_YELP_API_CLIENT_ID
GEODB_API_KEY=REPLACE_THIS_WITH_YOUR_GEODB_API_KEY
GEODO_API_HOST=REPLACE_THIS_WITH_YOUR_GEODO_API_HOST
```

Go into the front-end directory

    cd ../midwayfrontend

Install all dependicies

    npm install

Go into the root directory

    cd ..

Run the app

    npm run dev

## TODO
- [ ] Allow functionality to compute the midpoint using the distance of the starting locations.
- [ ] Allow users to enter more than 2 starting locations.


## Built With

  - [React](https://reactjs.org/) - Front-end library used to build the user interface 
  - [Material UI](https://mui.com/) - Utilized the component library to facilitate the building the front-end
  - [Express](https://expressjs.com/) - Web framework for Node.js for the back-end
  - [Google Maps Platform](https://developers.google.com/maps) - For computating travel times and distance 
  - [Yelp](https://www.yelp.com/developers) - For finding businesses and activities
  - [GeoDB Cities](http://geodb-cities-api.wirefreethought.com/) - For locating nearby cities 

## Contributing

All issues and feature requests are welcome.
Feel free to check the [issues page](https://github.com/JonathanCen/MidWay/issues) if you want to contribute.

## Authors

  - **Jonathan Cen** - [LinkedIn](https://www.linkedin.com/in/jonathancen/), [Github](https://github.com/JonathanCen)

## License

Copyright © 2019 [Jonathan Cen](<ADD PERSONAL WEBSITE LINK>).\
This project is [MIT licensed](https://github.com/JonathanCen/MidWay/blob/main/License).
