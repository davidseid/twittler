$(document).ready(function(){
        
        // creates a jquery object of all elements with class=feed
        var $feed = $('.feed');
        // sets the html of the first feed element to an empty string
        $feed.html('');
        
        
        
        // Creates function to add initial tweets
        var addTweet = function(index) {
        
          // Creates a jquery object of div class tweet called $tweetElement
          var $tweetElement = $('<div class="tweet"></div>');          
          
          // gets the tweet object at the index from the streams
          var tweet = streams.home[index];
          // gets the tweets username
          var username = tweet.user;
          // Creates a jquery object with the username class and html
          var $username = $('<div class="username ' +username+'">@'+username+':</div>');
          // Creates a jquery object div calss msg
          var $tweet = $('<div class="message"></div>');
          // Sets the text of the tweet div to the msg of the tweet
          $tweet.text(tweet.message);
          
          // Uses moment to get the created_at time and return its distance from now
          var humanFriendlyTime = moment(tweet.created_at, "LLLL").fromNow();

		  // Creates a jquery object with class date including the human friendly time
          var $date = $('<div class="date">'+humanFriendlyTime+'</div>');
          
          // !!!!Attempts to store the created at info on the element itself
          $date.data("timestamp", tweet.created_at);

          
          // Adds each of the divs to the tweet element
          $date.prependTo($tweetElement);
          $tweet.prependTo($tweetElement);
          $username.prependTo($tweetElement);
          $tweetElement.prependTo($feed);
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
          
          // finds the first message div element of the feed children, looks at innerhtml
          var newestTweet = $feed.children().find(".message")[0].innerHTML;
          // gets the most recent tweet from the streams code
          var nextTweet = streams.home[streams.home.length-1];
         
          // if the h2 text is home feed
          if ($("h2").text() === "Home Feed") {
            // only adds new tweets if not already on page
            if (newestTweet !== nextTweet.message) {
              addTweet(streams.home.length-1);
            }
          }
          
        }
        
        
        
        // When a user is clicked, hide tweets from all other users
        $(".feed").on("click", ".username", function() {
        
          // Find the class of tweets to perserve
          var $classToPreserve = $(this).attr("class").slice(9);
          $classToPreserve = "." + $classToPreserve;
          
          // Hide the other tweets
          var $tweetsToHide = $(".username").not($classToPreserve).closest(".tweet");
          $tweetsToHide.fadeOut('slow');
          
          // Change "Home Feed" to @username Timeline
          $("h2").text("@"+$classToPreserve.slice(1)+"  Timeline");
          
          // Create "Back to Home Feed" Button
          $(".button").fadeIn('very slow');
          
        });
        
        
        // Back to Home Feed Functionality
        $("button").on("click", function() {
          
          $(".button").fadeOut('very slow');
          
          $("h2").text("Home Feed");
          
          $(".tweet").fadeIn('slow');
          
        });
        

		window.setInterval(updateFeed, 2000);
		
		
		var updateDates = function() {
	      var $date = $('.date');
	      
	      for (var i = 0; i < $date.length; i++) {
	        var timestamp = $($date[i]).data('timestamp');
	        $($date[i]).text(moment(timestamp, "LLLL").fromNow());
	      }
		}
		
		window.setInterval(updateDates, 1000);
		
		
		

});