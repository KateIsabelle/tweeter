/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//example data
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Kato Potato",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@KatoCodes"
//     },
//     "content": {
//       "text": "Wherever you go, there you are"
//     },
//     "created_at": 1461116232227
//   },
// ]

//function takes in a tweet object, uses template literal
//to create html elements with tweet object info
//and returns html in $tweet variable
const createTweetElement = function (tweetObj) {
  const $tweet = $(`
    <article>
      <header class="tweet-show-header">
        <div class="username-icon">
          <img src=${tweetObj.user.avatars} alt="user icon">
          <div class="sml-left-padding">${tweetObj.user.name}</div>
        </div>
        <div class="handle">${tweetObj.user.handle}</div>
      </header>
      <section class="tweet-show-txt">${tweetObj.content.text}</section>
      <footer class="tweet-show-footer">
        <div class="small-txt">${tweetObj.created_at}</div>
        <div class="tweet-react-icons">
          <i class="fas fa-flag icon-react"></i>
          <i class="fas fa-retweet icon-react"></i>
          <i class="fas fa-heart icon-react"></i>
        </div>
      </footer>
    </article>
    `)

  return $tweet;
}

//function loops through tweet database, 
//creates tweet html element for each tweet object in db array,
//and appends it to the #tweet-container
const renderTweets = function (tweets) {
  for (const tweetN of tweets) {
    const $tweet = createTweetElement(tweetN);
    $('#tweets-container').append($tweet);
  }

}

//function prevents default submit, serializes tweet,
//and sends ajax post to server
const handleSubmit = function (event) {
  event.preventDefault();
  const tweetTextSerialized = $(event.target).serialize();
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweetTextSerialized
  })
    .then(res => console.log("AJAX post result:", res))
    .catch(err => console.log(err))
}


$(document).ready(function (e) {

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then((req, res) => {
        console.log("AJAX GET /tweets request:", req, "GET /tweets response:", res);
        // renderTweets(res);
      })
      .catch(err => console.log(err))
  }
  loadTweets();

  // renderTweets(data)

  $('#tweet-form').on('submit', handleSubmit)

});

// <i class="fas fa-user-astronaut fa-2x"></i>
