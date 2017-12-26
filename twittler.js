//DO:
//Don't make different pages, should be able to hide/display user timelines on one page
//Design HTML/CSS so into a clean feed
//Make layout and style mesh across pages
//Try different color per user
//Add logo, copyright, etc.


$(document).ready(function(){
        var $feed = $('.feed');
        $feed.html('');
        
        
        
        // Creates function to add initial tweets
        var addTweet = function(index) {
          var tweet = streams.home[index];
          var username = tweet.user;
          var userhref = username + '.html';
          
          var $username = $('<div><a href='+userhref+'>@'+username+': </a></div>');
          var $tweet = $('<div></div>');
          $tweet.text(tweet.message);

          var $date = $('<div>'+tweet.created_at+'</div>');
          
          $('<br />').prependTo($feed);
          $date.prependTo($feed);
          $tweet.prependTo($feed);
          $username.prependTo($feed);
        }
        

		// Creates an initial batch of tweets
        var index = streams.home.length - 1;
        while (index >= 0) {
          addTweet(index);
          index -= 1;
        }
        
        
        /*
        // Add new tweets via button 
        var $button = $('button');
        $button.on('click', function() {
          var existingTopLine = $feed.contents()[0].innerHTML;
          var newTweet = streams.home[streams.home.length-1];
          var $newTweet = $('<div></div>');
          $newTweet.text('@' + newTweet.user + ': ' + newTweet.message);
          
          
          // only adds new tweets if not already on page
          if (existingTopLine !== $newTweet.text()) {
            $newTweet.prependTo($feed);
          }
          
        });
        */
        
        // Automatically add new tweets 
        var updateFeed = function() {
          var newestTweet = $feed.contents()[1].innerHTML;
          var nextTweet = streams.home[streams.home.length-1];
         
          
          // only adds new tweets if not already on page
          if (newestTweet !== nextTweet.message) {
            addTweet(streams.home.length-1);
          }
          console.log(streams.users.shawndrost[streams.users.shawndrost.length-1]);
        }
        
        window.setInterval(updateFeed, 1500);
				

});