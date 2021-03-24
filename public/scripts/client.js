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

//function prevents XSS with escaping
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//function takes in a tweet object, uses template literal
//to create html elements with tweet object info
//and returns html in $tweet variable
const createTweetElement = function (tweetObj) {
  const $tweet = $(`
    <article>
      <header class="tweet-show-header">
        <div class="username-icon">
          <img src=${escape(tweetObj.user.avatars)} alt="user icon">
          <div class="sml-left-padding">${escape(tweetObj.user.name)}</div>
        </div>
        <div class="handle">${escape(tweetObj.user.handle)}</div>
      </header>
      <section class="tweet-show-txt">${escape(tweetObj.content.text)}</section>
      <footer class="tweet-show-footer">
        <div class="small-txt">${escape(tweetObj.created_at)}</div>
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
for (let i = tweets.length-1; i >= 0; i--) {
  const $tweet = createTweetElement(tweets[i]);
  $('#tweets-container').append($tweet);
}

  // for (const tweetN of tweets) {
  //   const $tweet = createTweetElement(tweetN);
  //   $('#tweets-container').append($tweet);
  // }
}

const formValidation = function() {
  const tweetText = $('#tweet-text').val();
  //removes any element with an error class from the documents
  //so that on subsequent submissions, form will not have prior error msgs:
  $('.error').remove();

  if (!tweetText) {
    alert('Write something!')
    return false
  }
  if (tweetText.length > 140) {
    alert('Too many characters!');
    return false
  }
  return true;
}

//function prevents default submit, serializes tweet,
//and sends ajax post to server
const handleSubmit = function(event) {
  event.preventDefault();
  //if form validation returns true, proceed with ajax request
  if (formValidation()) {
    const tweetTextSerialized = $(event.target).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweetTextSerialized
    })
    .then(res => {
      $('#tweets-container').empty();
      loadTweets();
    })
    .catch(err => console.log(err))
  }
}

//function makes get request with ajax to '/tweets'
//and then calls renderTweets function passing in req as argument
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then(tweets => renderTweets(tweets))
    .catch(err => console.log(err))
}

$(document).ready(function (e) {
//load pre-existing tweets upon document-ready:
  loadTweets();

  //when tweet form is submitted, handleSubmit function is called
  $('#tweet-form').on('submit', handleSubmit)

});

// <i class="fas fa-user-astronaut fa-2x"></i>
