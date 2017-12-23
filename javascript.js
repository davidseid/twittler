$(document).ready(function(){
        var $feed = $('.feed');
        $feed.html('');

        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div></div>');
          var $date = $('<div>'+tweet.created_at+'</div>');
          $tweet.text('@' + tweet.user + ': ' + tweet.message);
          $tweet.appendTo($feed);
          $date.appendTo($feed);
          index -= 1;
        }
        
        
        
        var $button = $('button');
        $button.on('click', function() {
          var existingTopLine = $feed.contents()[0].innerHTML;
          var newTweet = streams.home[streams.home.length-1];
          var $newTweet = $('<div></div>');
          $newTweet.text('@' + newTweet.user + ': ' + newTweet.message);
          
          if (existingTopLine !== $newTweet.text()) {
            $newTweet.prependTo($feed);
          }
          
        });
        
        var topLine = $feed;
        console.log(topLine.contents()[0]);
		
		// only update if there is a new tweet, otherwise do nothing
		
		
		
		
		//BASIC REQS
		// Show the user new tweets when they hit the button
		// Make the interface interesting and fun 
		// Display timestamps of when the tweets were actually created
		// Allow the user to click on a username to see that users timeline

});