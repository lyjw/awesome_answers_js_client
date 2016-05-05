// This is required because we're outside our application
// Relative URLs are not available
var baseURL = "http://localhost:3000/";

$(document).ready(function() {

  // Make an AJAX request to the Awesome Answers server
  $.ajax({
    method: "GET",
    url: baseURL + "questions.json",
    success: function(questions) {
      // Step 1: Fetch the template HTML from the DOM
      var template = $("#question-summary").html();
      // Step 2: Parse the template. Optional but speeds up future uses.
      Mustache.parse(template);

      for (var i = 0; i < questions.length; i++) {
        // Step 3: We generate HTML using the data we get and the template we parsed. We pass in a hash - questions[i]
        var rendered = Mustache.render(template, questions[i]);
        //Step 4: Add the rendered HTML to the DOM
        $("#questions").append(rendered);
      }
    },
    // Server error, not validation error
    error: function() {
      alert("Problem loading questions. Please retry.");
    }
  });

  $("#questions").on("click", "h2 a", function() {
    $.ajax({
      method: "GET",
      url: baseURL + "questions/" + $(this).data("id") + ".json",
      success: function(question) {
        var template = $("#question-details").html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, question);
        $("#single-question").html(rendered);

        // Once #questions fades out, the callback function fades single-question in
        $("#questions").fadeOut(500, function() {
          $("#single-question").fadeIn(500);
        });
      },
      error: function() {
        alert("Error loading question. Please try again.");
      }
    });
  });

  $("#single-question").on("click", "#back", function() {
    $("#single-question").fadeOut(500, function() {
      $("#questions").fadeIn(500);
    });
  });

});
