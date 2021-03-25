const tweetDate = function(createdAt) {
  const now = Date.now();
  const oneDayMs = 1000 * 60 * 60 * 24; //86400000ms
  const difference = now - createdAt;

  return difference / oneDayMs;

}
console.log(tweetDate(1461116232227));
console.log(tweetDate(1616706460954))
