# KenjoWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.


## How to run

There are 3 ways to run this app:
1. From DockerHub image: just run `docker-compose -f docker-compose_prod.yml up` and docker will pull both UI and API images from the Hub. Navigate to `http://localhost/`
2. Locally from docker image: run `docker-compose build && docker-compose up` to build an image from the code and pull the API from the Hub. Navigate to `http://localhost/`
3. Locally from the code: Run `npm install` and then `ng serve` for a dev UI server. Run the API from file in `backend/docker-compose.yml`. Navigate to `http://localhost:4200/`

## Tasks and features
1. API: files to run api are in `backend`folder, including database dump
2. Angular 2+ App: Allows CRUDs for Album and Artist database entities. Using ng-select to link an artist to an album
3. CSS Framework: Used Bulma, a flexbox based framework: https://bulma.io/
4. Image URL: Provided URL is used as src for image. Ideally we would want to store this image in the server filesystem or a cloud hosting, but it is not possible to implement these without access to the backend code
5. Testing: created unit tests for some components and services
6. Dockerized the app with docker-compose
7. UI/UX: 
    * App is fully responsive, with two different component templates for mobile and desktop (see images below)
    * Form validation in front end server error handling

## Further improvements
1. Add more tests, to cover 100% of the features
2. Improve the UI design to make it more visually appealing
3. Add CICD pipelines

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Not all the app has been tested due to time constraints. 
These are the components and services that have been tested:
* AlbumsFormComponent
* ArtistsComponent
* ArtistsAPIService

Note that the tests created are not enough to completely test the features of the app, but they are a good starting point.

## Screenshots

Table views:

![image](https://user-images.githubusercontent.com/32127756/140659709-1fe12aeb-526f-4e20-8bdf-1bc77cd9dd78.png)
![image](https://user-images.githubusercontent.com/32127756/140659718-b5cd9bd6-531d-422c-a665-c42c2ab43578.png)

Form views:

![image](https://user-images.githubusercontent.com/32127756/140659729-2cda8c5c-eb8c-4126-8e58-a4318a55440a.png)

Mobile view:

![image](https://user-images.githubusercontent.com/32127756/140659741-1cd11f07-3a4c-49f7-a014-a4cfd75c1644.png)
![image](https://user-images.githubusercontent.com/32127756/140659756-d9c995a0-da90-4cdc-8c91-56127e8060c8.png)


