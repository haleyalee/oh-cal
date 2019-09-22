$(document).ready(function () {
  $(".dropdown").hover(function () { //When trigger is hovered...
    $(".dropdown-content").show();
  }, function () {
    $(".dropdown-content").hide();
  })
});