
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$(document).ready(function(e) {
  //hide error on load
  $('.error').hide();

  //load pre-existing tweets upon document-ready:
  loadTweets();

  //when tweet form is submitted, handleSubmit function is called
  $('#tweet-form').on('submit', handleSubmit)

});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//function prevents XSS with escaping
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//function takes in tweets creation date in milliseconds and returns string of 'days ago'
const tweetDate = function(createdAt) {
  const oneDayMs = 1000 * 60 * 60 * 24; //86400000ms
  const now = new Date();
  const created = new Date(createdAt);
  const difference = now - created;

  const daysAgo = Math.floor(difference / oneDayMs);

  const moment = daysAgo < 1 ? "Today" :
    (daysAgo < 2 ? `${daysAgo} day ago` :
      `${daysAgo} days ago`)

  return moment;
}

//function takes in a tweet object, and returns html template
const createTweetElement = function(tweetObj) {
  const moment = tweetDate(tweetObj.created_at);

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
        <div class="small-txt">${escape(moment)}</div>
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

//function creates html elements for each tweet object in db array, and appends it to the #tweet-container
const renderTweets = function(tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
}

//function to validate form before allowing post
const formValidation = function() {
  const tweetText = $('#tweet-text').val();

  if (!tweetText) {
    $('.error').slideUp()
    $('.error').text("Write something, then press Tweet button. What's on your mind?")
    $('.error').slideDown()
    return false
  }
  //if tweet is only empty spaces
  if (tweetText.match(/^\s*$/)) {
    $('.error').slideUp()
    $('.error').text("Write a message. What's on your mind?")
    $('.error').slideDown()
    $('#tweet-text').val('');
    $('.counter').val('140')
    return false
  }

  if (tweetText.length > 140) {
    $('.error').slideUp()
    $('.error').text("Oops! Tweet must be 140 characters or less.")
    $('.error').slideDown()
    return false
  }

  $('.error').slideUp()
  return true;
}

//function prevents default submit and, if formValidation is true, 
//serializes tweet, sends ajax post to server 
//if post is successful, resets textarea value, empties #tweet-container and reloads tweets
const handleSubmit = function(event) {
  event.preventDefault();

  if (formValidation()) {
    const tweetTextSerialized = $(event.target).serialize();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweetTextSerialized
    })
      .then(res => {
        $('#tweet-text').val('');
        $('.counter').val('140')
        $('#tweets-container').empty();
        loadTweets();
      })
      .catch(err => console.log(err))
  }
}

//function makes get request with ajax to '/tweets' and then renders tweets from request 
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then(tweets => renderTweets(tweets))
    .catch(err => console.log(err))
}



