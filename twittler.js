//DO:
//hide/display user timelines on one page
//Design HTML/CSS so into a clean feed
//Try different color per user
//Add logo, copyright, etc.


$(document).ready(function(){
        var $feed = $('.feed');
        $feed.html('');
        
        
        
        // Creates function to add initial tweets
        var addTweet = function(index) {
        
          var $tweetElement = $('<div class="tweet"></div>');
          $tweetElement.html('');
          
          var tweet = streams.home[index];
          var username = tweet.user;
          var userhref = username + '.html';
          var $username = $('<div class="username ' +username+'">@'+username+':</div>');
          var $tweet = $('<div class="message"></div>');
          $tweet.text(tweet.message);

          var $date = $('<div class="date">'+tweet.created_at+'</div>');
          
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
          var newestTweet = $feed.contents().find(".message")[0].innerHTML;
          var nextTweet = streams.home[streams.home.length-1];
         
          // only add new tweets if on the home feed
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
          
          
          //Need to make it so that the automatically updating tweets
          // are filtered when the timeline is being displayed
          
          //Why aren't the newer usernames clickable?
          
          //Option 1: 
          // Instead of just adding tweets to HTML, always first check 
          // if there is a specific user selected, and only add those.
        });
        
        
        // Back to Home Feed Functionality
        $("button").on("click", function() {
          
          $(".button").fadeOut('very slow');
          
          $("h2").text("Home Feed");
          
          $(".tweet").fadeIn('slow');
          
        });

		window.setInterval(updateFeed, 2000);
		

});