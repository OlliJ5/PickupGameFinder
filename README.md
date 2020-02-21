# PickupGameFinder

![](https://github.com/OlliJ5/PickupGameFinder/workflows/Run%20linter,%20tests%20and%20deploy/badge.svg)

A web app for finding pick-up basketball games. This app is still a work in progress.

[Backlog](https://docs.google.com/spreadsheets/d/1VMyOqbmccVdbq__0r0rGO4KeEypxb-fd2tGXDbRVQhc/edit#gid=0)

The app is up and running [here](https://ollij5.github.io/PickupGameFinder/).

The backend code of this application can be found in this [repository](https://github.com/OlliJ5/PickupGameFinder-back).

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
