var Twitter = require('twitter');
var keys = require('./keys.js');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var command = process.argv;
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'injeradorowet'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = tweets.length - 1; i > = 0; i--) {
  		console.log("Tweet" + i + ": " + tweets[i].text)
  	}
  }
});
}
if(command[2]== 'movie-this'){
	var movie = command[3] || 'the revenant';
		var queryUrl ='http://www.omdbapi.com/?t='+movie+'&y=&plot+short&r=jason';
		request(queryUrl, function(error, response, body){
			if(!error && response.statusCode ==200){
				console.log('Title of the movie:'+JSON.parse(body)['Title']);
				console.log('Year the movie came out:'+JSON.parse(body)['Year']);
				console.log('IMDB Rating of the movie'+JSON.parse(body)['Rating']);
				console.log('Plot of the movie:'+JSON.parse(body)['Plot']);
				console.log('Actors in the movie:'+JSON.parse(body)['Actors']);
				console.log('Rotten Tomatoes Rating:'+JSON.parse(body)['tomatoesRating']);
				console.log('Rotten Tomatoes URL:'+JSON.parse(body)['tomatoesURL']);
		}
	});
}if(command[2] =='spotify-this-song'){
	spotify.search({type:'track',query:command[3] ||'Triller by Michael Jackson'}, function(err,data){
			if(err){
				console.log('error:'+ err);
					return;
				}
				for(var i=0; i< 10; i++){
					console.log('Artist:'+JSON.stringify(data.tracks.items[i].artists[0].name, null,2));
					console.log('track:'+JSON.stringify(data.tracks.items[i].name, null,2));
					console.log('Album:'+JSON.stringify(data.tracks.items[i].name, null,2));
					console.log('');
                }
            });
}
if(command[2] == 'do-what-it-says'){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
			return console.log(error);
		}

		var dataArr = data.split(', ');
		
		if(dataArr[0] == 'spotify-this-song') {
			spotify.search({ type: 'track', query: dataArr[1] || 'Triller by Michael Jackson' }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			        return;
			    }
			    for(var i = 0; 10 > i;i++){
			    	console.log('Artist: ' + JSON.stringify(data.tracks.items[i].artists[0].name, null, 2));
				    console.log('Track: ' + JSON.stringify(data.tracks.items[i].name, null, 2));
				    console.log('Album: ' + JSON.stringify(data.tracks.items[i].album.name, null, 2)); 
				    console.log('');
			    }
			});
		}

