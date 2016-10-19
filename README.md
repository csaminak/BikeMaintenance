# [Bike Memo](https://bike-memo.herokuapp.com)

This is my final project for the Front-End Engineering course at The Iron Yard. Working with a back-end engineering student, I created a responsive web application, built with Angular, that notifies a cyclist when it is time to get their bike tuned up.

We used a fitness app called Strava, which tracks and logs an athlete's biking and running activities. A cyclist will login to Bike Memo through an oAuth process using their Strava account. Once logged in, the cyclist will be directed to input information about their bike and it's individual parts.

By pulling the mileage from Strava, we can calculate when a part has reached its limit and send the cyclist an email notification to get their bike checked out.

#### In Order to Run App:
- Clone the application
- A working Ruby 2.3.1 environment
- A working Rails 5.0 environment
- A working Node 6.5 environment
- A Strava account
- A Heroku account
- [Back-End database to call](https://github.com/Cycling-app/cycling-main)
- run `npm install`
- run `grunt`
