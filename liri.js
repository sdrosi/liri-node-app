require("dotenv").config();
var input = process.argv[2];
var userQuery = process.argv.slice(3).join('+');
var Spotify = require('node-spotify-api');
var getKey = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(getKey.twitter);
var spotify = new Spotify(getKey.spotify);
var omdbQueryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
var omdbQueryUrlNobody = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
var request = require("request");
var requestToken="";
var requestTokenSecret="";
var oauth_verifier="";

//Twitter Call
if (input === "my-tweets"){
    doTwitter();
}

//Spotify Call
else if (input === "spotify-this-song") {
    if (!process.argv[3]){
        doSpotify();
        } else {
        doSpotifyTwo();
}}

//OMDB Call
else if (input === "movie-this") {
    if (!process.argv[3]){
    doOmdbOne();
    } else {
    doOmdbTwo();
}}

// Do what it says call
else if (input === "do-what-it-says") {
    doSomething();
};


function doSpotify() {

    spotify.search({ type: 'track', query: 'The Sign', limit: 10 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("=============================================");
        //artist name
        console.log("The artist name is: " + data.tracks.items[5].artists[0].name)
        //song name
        console.log("The song name is: " + data.tracks.items[5].name)
        //preview link
        console.log("The preview link is: " + data.tracks.items[5].artists[0].href)
        //album name
        console.log("The album name is: " + data.tracks.items[5].album.name)
        console.log("=============================================");
      });
    
};

function doSpotifyTwo() {
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("=============================================");
        //artist name
        console.log("The artist name is: " + data.tracks.items[0].artists[0].name)
        //song name
        console.log("The song name is: " + data.tracks.items[0].name)
        //preview link
        console.log("The preview link is: " + data.tracks.items[0].artists[0].href)
        //album name
        console.log("The album name is: " + data.tracks.items[0].album.name)
        console.log("=============================================");
    });
};

function doTwitter() {
    var params = { screen_name: "sheign_droc", count: 10 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("=============================================");
            console.log("Here are the most recent tweets");

            for (var i = 0; i < tweets.length; i++) {

                console.log("_____________________________________________");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
};
function doOmdbOne() {
    //for debugging the url
    console.log(omdbQueryUrlNobody);
    //make a request to the omdb API with a function handling errors, response, and data
    request(omdbQueryUrlNobody, function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover each required piece, print to the console
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's release year is: " + JSON.parse(body).Year);
    console.log("The movie's iMDB rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
    console.log("The movie's was created in: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    }});
};

function doOmdbTwo() {
    //for debugging the url
    console.log(omdbQueryUrl);
    //make a request to the omdb API with a function handling errors, response, and data
    request(omdbQueryUrl, function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover each required piece, print to the console
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's release year is: " + JSON.parse(body).Year);
    console.log("The movie's iMDB rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
    console.log("The movie's was created in: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    }});
};

function doSomething() {

    var fs = require("fs");

    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
    console.log(error);
    return false
    }

    var silly = data.split(',');
    console.log(silly[1]);
    spotify.search({ type: 'track', query: silly[1], limit: 1 }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("=============================================");
        //artist name
        console.log("The artist name is: " + data.tracks.items[0].artists[0].name)
        //song name
        console.log("The song name is: " + data.tracks.items[0].name)
        //preview link
        console.log("The preview link is: " + data.tracks.items[0].artists[0].href)
        //album name
        console.log("The album name is: " + data.tracks.items[0].album.name)
        console.log("=============================================");
    });
    
    });
};
