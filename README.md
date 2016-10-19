# [Bike Memo](https://bike-memo.herokuapp.com)

This is my final project for the Front-End Engineering course at The Iron Yard. Working with a [back end](https://github.com/Cycling-app/cycling-main) engineering student, I created a responsive web application, built with Angular, that notifies a cyclist when it is time to get their bike tuned up.

We used a fitness app called Strava, which tracks and logs an athlete's biking and running activities. A cyclist will login to Bike Memo through an oAuth process using their Strava account. Once logged in, the cyclist will be directed to input information about their bike and it's individual parts.

By pulling the mileage from Strava, we can calculate when a part has reached its limit and send the cyclist an email notification to get their bike checked out.

#### Requirements
- A working Ruby 2.3.1 environment
- A working Rails 5.0 environment
- A working Node 6.5 environment
- A [Heroku](https://www.heroku.com/) account
- A [Strava](https://www.strava.com/) account (for logging into the app)

#### Running locally †
- Clone this git repository
- run `npm install`
- run `grunt`
- run `http-server build/`

#### Deploying to Heroku
- In Heroku, [add a GitHub integration](https://devcenter.heroku.com/articles/github-integration)
- Once you've created your app, go to settings and scroll down to the buildpacks section, then:
  - Add Ruby buildpack
  - Add Nodejs buildpack
- Push the app - once your repository is linked with Heroku, deploying the app should be automated

† *This doesn't actually work locally - the app will run, but when you try to log in, it will redirect you to the deployed app at https://bike-memo.herokuapp.com/ due to a limitation on the back end.*
