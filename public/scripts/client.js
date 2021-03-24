/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (e) {
  
  const createTweetElement = function (tweetObj) {
    return $(`
    <article>
    <header class="tweet-show-header">
    <div class="username-icon">
    <i class="fas fa-user-astronaut fa-2x"></i>
    <div class="sml-left-padding">${tweetData.user.name}</div>
    </div>
    <div class="handle">${tweetData.user.handle}</div>
    </header>
    <section class="tweet-show-txt">${tweetData.content.text}</section>
    <footer class="tweet-show-footer">
    <div class="small-txt">${tweetData.created_at}</div>
    <div class="tweet-react-icons">
    <i class="fas fa-flag icon-react"></i>
    <i class="fas fa-retweet icon-react"></i>
    <i class="fas fa-heart icon-react"></i>
    </div>
    </footer>
    </article>
    `)
  }

  const renderTweets = function() {
    const $tweet = createTweetElement(tweetData);
    console.log($tweet); // to see what it looks like

  }
  
});

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// Test / driver code (temporary)
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
