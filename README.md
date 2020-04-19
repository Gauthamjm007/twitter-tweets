# Twitter Fetching Tweets

![twitter]("./twitter.gif)
![twitter2]("./twitter2.gif)

## Table of Contents

- [Solution for Record-Linkage](#twitter-fetching-tweets)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Problem Statement](#problem-statement)
    - [Overview of the solution](#overview-of-the-solution)
    - [Challenges](#challenges)
  - [Important Folders and Files](#important-folders-and-files)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Limitations](#Limitations)
  - [Author](#author)

## Introduction

A Twitter App built for fetching user tweets <br/> to view it live click [here](https://twitter-tweets-goutham.herokuapp.com/)

**Tech Stack Used** : <br/>
**Front End**:React,Redux,Bootstrap,Socket.io Client <br/>
**Back End**:Express,Socket.io,Validator,dotenv,twitter(npm package to interact with twitter api) <br/>

### Problem Statement

**Objective** Design and develop a user interface to display real-time Twitter data in an universal Javascript environment<br/>

**Functional Requirements:**

- The UI contains a search box to let users search for a keyword. When the user presses the search button, the application should display blocks of 10 tweets at a time using the Twitter streaming API.<br/>
- If the search result contains more than 10 tweets, provide a "Load more" or infinity scrolling option to display a maximum of 100 tweets.<br/>
- As new tweets arrive matching the keyword, the user interface should update itself in real-time allowing users to view the newly arrived batch of tweets; in other words, new unread tweets should have a notification bar that should prompt the user to view them in an event driven fashion (look at Twitter search interface for inspiration)<br/>
- Each tweet should be displayed in rich formatting, quite similar to the Twitter interface itself.<br/>

### Overview of the solution

1. Using Twitter Api , for fetching tweets, Using two types of Api fetching ,one as per user clicks and another streaming notification<br/>

2. One to get the tweets using express to making the Api call for the particular tweets , as we can make a limited number of calls for the api we cannot make the Api calls every time to get the data,we can make only 15 requests per 15 minutes for the tweets<br/>

3. It will be stored inside the redux store , The data is fetched 100 at a time and it is paginated everytime the user , scrolls down and click if wants to see more<br/>

4. The notification has to be updated with out axios call every second , The best solution would be to use WebSocket , I have used a library called as Socket.io which is a implementation of Websockets for realtime datafetch , for viewing the data like twitter we can use twitter widget , for optimal web page performance and to enable tracking of Twitter widget JavaScript events.<br/>

5. The tweets are fetched by default by latest, but It will be an issue if the user wishes to get the tweets based on the retweets or popular ones to tackle it , sorting of the tweets is done<br/>

### Challenges

- Fetching Real Time Tweets for notification , if a word is being tweeted too many times , there will be an issue as many tweets will be fetched , so I made a slice of it and only the most 10 real time tweets will be viewed and If a user tweets again the last one is removed an the new one is added to the notification<br/>

reference : https://javascriptstore.com/2018/03/18/stream-tweets-with-react-express-socket-io-and-twitter/<br/>

- Making the view to be like twitter and Generate markup for a Tweet or Follow button
  Generate markup for an embedded Tweet or timeline
  Create an Embedded Search Timeline <br/>

reference: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites<br/>

- Making Design Responsive using grid system <br/>
  https://getbootstrap.com/docs/4.1/layout/grid/<br/>

- Faced an Error in socket-io client<br/>

```
 Failed to minify the code from this file:
./node_modules/socket.io-client/node_modules/debug/src/browser.js:155
```

<br/>
**solution** : downgrade socket.io-client version to 1.7.0,

## Important Folders and Files

```
twitter-tweets
 ┣ node_modules
 ┣ client
 ┣ app
 ┃  ┣ controllers
 ┃        ┗ searchController.js     (How to handle backend when user searched for it)
 ┃  ┣ middleware
 ┃  ┗ models
 ┃
 ┣ config
 ┃  ┗ router.js                     (Containes all backend points)
 ┃
 ┣ .gitignore
 ┣ package.json                     (Contains all the packages and dependencies)
 ┣ README.md                        ( A Brief Description of the project)
 ┗ server.js                        (A Main backend file having all backend functions)

 client
 ┣  build
 ┃   ┣ static
 ┃   ┃ ┣ css
 ┃   ┃ ┃ ┣ main.32898cf0.css
 ┃   ┃ ┃ ┗ main.32898cf0.css.map
 ┃	 ┃ ┗ js
 ┃	 ┃ ┃ ┣ main.9af315c3.js
 ┃	 ┃ ┃ ┗ main.9af315c3.js.map
 ┃	 ┣ asset-manifest.json
 ┃	 ┣ index.html
 ┃
 ┣  public
 ┃    ┗ index.html                   (contains header , ico icon , twitter widget)
 ┃
 ┗	src
     ┣ actions
	 ┃ ┣ searchActions.js             (action generator for fetching tweets , spinner , errors and sorting)
	 ┃ ┗ textActions.js               ( contains what the user searches for)
	 ┣ components
       ┃ ┣ layouts
	   ┃ ┃ ┗ Navbar.js                 (Navigation bar contains the header of the nav bar)
       ┃ ┣ notifications
       ┃ ┃ ┣ NotificationHeader.js      (Navigation header)
       ┃ ┃ ┣ NotificationsCard.js       (card element containing the user name , what he has tweets and the time)
       ┃ ┃ ┗ NotificationsList.js       (List of all fetched tweets)
       ┃ ┗ search
       ┃ ┃ ┣ InputField.js              (search input for tweets)
	   ┃ ┃ ┣ SearchBar.js               (contains search bar, search button and sorting)
       ┃ ┃ ┣ TweetEmbed.js              (For embedding twitter widget)
       ┃ ┃ ┣ TweetFeed.js               (Contains the embedding feed)
       ┃ ┃ ┗ TweetResult.js             (All the tweets are fetched here , can be paginated)
    ┣ reducers
       ┃ ┣ errorReducer.js              (A reducer for errors)
       ┃ ┣ searchReducer.js             (A redux reducer for tweets data)
       ┃ ┗ textReducer.js               (The user searches are passed here)
    ┣ selector
       ┃ ┣ isEmpty.js                   (Check if the field is empty or not)
       ┃ ┗ sortMethods.js               (Sorting selector for sorting by Date,Retweets and Fav)
 ┣ App.css                              (Main css containing necessary styling)
 ┣ App.js                               (Main app js file containing navbar and rest of the components)
 ┣ App.test.js
 ┣ index.css
 ┗ index.js


```

## Dependencies

- body-parser >=1.18.3
- concurrently >=3.6.0
- express >= 4.16.3,
- socket.io>= 2.3.0,
- twitter >= 1.7.1,
- validator >= 10.4.0,
- axios >= 0.18.1,
- bootstrap >= 4.4.1,
- classnames >=2.2.6,
- react >= 16.13.1,
- react-dom >= 16.13.1,
- react-redux>= 5.1.2,
- react-router-dom>= 4.3.1,
- react-scripts>= 1.1.4,
- react-transition-group>= 4.3.0,
- redux>= 3.7.2,
- redux-thunk>= 2.3.0,
- socket.io-client>= 1.7.0

## Installation

Install latest version of Node JS and Google Chrome<br/>

to run in local repository you can run <br/>

#### git clone https://github.com/Gauthamjm007/twitter-tweets.git

#### cd twitter-tweets

#### npm install

#### cd client

#### npm install

#### cd ..

#### npm run dev

## Limitations

- Twitter Api can make only a fixed number of requests within 15 min and can fetch upto a maximum of 200 tweets , to improve it we can get the enterprise edition , or Premium Edition<br/>
- The twitter widget is not working in the lastest version of the mozilla browser , I am trying to fix it , without any configuration , one way to solve it is to remove add blocker and allow mozilla to set cookies for the site<br/>

## Author

- [Goutham JM](https://gauthamjm007.github.io/portfolio/)
