# PickupGameFinder

![](https://github.com/OlliJ5/PickupGameFinder/workflows/Run%20linter,%20tests%20and%20deploy/badge.svg)

A web app for finding pick-up basketball games. 

[Backlog and work hours](https://docs.google.com/spreadsheets/d/1VMyOqbmccVdbq__0r0rGO4KeEypxb-fd2tGXDbRVQhc/edit#gid=0)

The app is up and running [here](https://ollij5.github.io/PickupGameFinder/).

The backend code of this application can be found in this [repository](https://github.com/OlliJ5/PickupGameFinder-back).

## Using the app
You can create an account on the front page. You are logged in automatically after that. An intro is shown, where
the app is introduced. When logged in there are two separate views. The map which is the most important one, and your profile.


On the map page you can find and join games which are marked with a basketball icon. You can also create new games which are shown on the map by clicking the new game button in the top right corner. For the location of the game you can either use your current location or you can choose *Select from map* and click the map to set the location.


You can enter the profile page by clicking your name on the navigation bar and then selecting *Profile*. On this page you can see a list of the games you have created and also a list of the games you have participated in (this includes the games you have created automatically). In your profile you can also toggle between darkmode and the eye burning light mode.

Here's a gif of cypress runnign some tests in slower motion. Works as a quick overview of the functionalities.

<img src='https://github.com/OlliJ5/PickupGameFinder/blob/master/src/resources/cypress.gif' width='800' height='500' />

## Running the app locally
Clone this repository to your machine.

Navigate to the root of the app. This is the directory where the file package.json is.

Run the command:
```
npm install
```
This will install the dependencies needed for the project.

Run the command:
```
npm start
```
This starts the frontend.

You also need to start the backend locally for the app to work.
Check out the [backend repository](https://github.com/OlliJ5/PickupGameFinder-back) for information on how to do that.

## Tests

### Configuring

To run cypress tests locally

Start the backend in test env

```
npm run start:test
```

Start the frontend with

```
npm start
```

### Running tests option 1

Start Cypress with

```
npm run cypress:open
```

and run all the specs

### Running tests option 2

Run the command
```
npm run test:e2e
```
