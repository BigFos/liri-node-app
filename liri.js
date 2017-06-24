var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var pro = process.argv;

var client = new Twitter(keys.twitterKeys);

if (pro[2] === "my-tweets") {

    var params = { screen_name: 'cook poo' };
    client.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("\n"+tweets[i].created_at);
                console.log(tweets[i].text);
            }
        } else {
            console.log(error);
        }
    });
} else if (pro[2] === "spotify-this-song") {

    var track = "";
    if(pro[3] == null){
    	track = "The Sign"
    }
    else{
    for (var n = 3; n < pro.length; n++) {
        track = track + " " + pro[n];
    }
	}
    var spotify = new Spotify(keys.spotifyKeys);

    spotify
        .search({ type: 'track', query: track })
        .then(function(response) {
            for (var j = 0; j < response.tracks.items.length; j++) {
                console.log("\nArtist: " + response.tracks.items[j].artists[0].name);
                console.log("Name: " + response.tracks.items[j].name);
                console.log("URL: " + response.tracks.items[j].external_urls.spotify);
                console.log("Album: " + response.tracks.items[j].album.name);
            }
        })
        .catch(function(err) {
            console.log(error);
        });
}
else if(pro[2] === "movie-this"){
	 var title = "";
    if(pro[3] == null){
    	title = "Mr+Nobody"
    }
    else{
    for (var n = 3; n < pro.length; n++) {
        title = title + "+" + pro[n];
    }
	}
request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("\nTitle: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Website: " + JSON.parse(body).Website);
  }
});
}
else if(pro[2] === "do-what-it-says"){
fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  // We will then print the contents of data
  // console.log(data);
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  // We will then re-display the content as an array for later use.
  // console.log(dataArr);
  pro[2] = dataArr[0];
  pro[3] = dataArr[1];
});
}