$(document).ready(function() {
  $("#btn").on('click', function() {
  });

  $("textarea").on('input', function(e) {
    const max = 140;
    const txtLength = $(this).val().length;
    let charCountDown = max - txtLength;
    //access the child of the next sibling that has a .counter class
    const charCountDisplay = $(this).next().children(".counter");
    if (charCountDown < 0) {
      $(charCountDisplay).css("color", "red").html(charCountDown);

    } else if (charCountDown <= 10) {
      $(charCountDisplay).css("color", "orange").html(charCountDown);

    } else {
      $(charCountDisplay).css("color", "#545149").html(charCountDown);
      
    }    
  });
  
});