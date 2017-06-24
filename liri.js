var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var pro = process.argv;

var client = new Twitter(keys.twitterKeys);

if (pro[2] === "my-tweets") {

    var params = { screen_name: 'cook poo' };
    client.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        } else {
            console.log(error);
        }
    });
} else if (pro[2] === "spotify-this-song") {

    var track = "";

    for (var n = 3; n < pro.length; n++) {
        track = track + " " + pro[n];
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
