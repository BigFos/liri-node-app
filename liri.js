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
}

else if(pro[2] === "spotify-this-song"){

 
var spotify = new Spotify(keys.spotifyKeys);
// console.log(keys.spotifyKeys);
spotify
  .search({ type: 'track', query: 'all the small things' })
  .then(function(response) {
    for (var j = 0; j < response.tracks.items.length; j++) {
                console.log("\nArtist: " + response.tracks.items[j].artists[0].name);
                console.log("Name: " + response.tracks.items[j].name);
                console.log("URL: " + response.tracks.items[j].external_urls.spotify);
                console.log("Album: " + response.tracks.items[j].album.name);
    
}
    // console.log(response);         
  })
  .catch(function(err) {
    console.log(error);
  });
// spotify.search({ type: 'track', query: 'I will always love you' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });
}