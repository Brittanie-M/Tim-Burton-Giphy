$(document).ready(function () {
    //Array for searched topics to be added
  var topics = [];
  
       function displayGifs() {
  
      var input = $(this).data("search");
      console.log(input);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=nW31Z99cayfwRpLtWHxS1QzjxGDXWcnb&limit=10";
  
      console.log(queryURL);
  
      $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
              var results = response.data;
              console.log(results);
              for (var i = 0; i < results.length; i++) {
              
              var showDiv = $("<div class='col-md-4'>");
  
              var rating = results[i].rating;
              var animated = results[i].images.fixed_height.url;
              var static = results[i].images.fixed_height_still.url;
              var gifImage = $("<img>");
              var p = $("<p>").text("Rating: " + rating);
  
              gifImage.attr("src", static);
              gifImage.addClass("newGiphy");
              gifImage.attr("data-state", "still");
              gifImage.attr("data-still", static);
              gifImage.attr("data-animate", animated);
              showDiv.append(p);
              showDiv.append(gifImage);
              $("#gifDisplay").prepend(showDiv);
  
          }
      });
  }
  
      $("#addGif").on("click", function(event) {
          event.preventDefault();
          var userInput = $("#gifInput").val().trim();
          topics.push(userInput);
          console.log(topics);
          $("#gifInput").val('');
          displayButtons();
        });
  
      function displayButtons() {
      $("#myFaves").empty();
      for (var i = 0; i < topics.length; i++) {
        var newGif = $('<button class="btn btn-primary">');
        newGif.attr("id", "show");
        newGif.attr("data-search", topics[i]);
        newGif.text(topics[i]);
        $("#myFaves").append(newGif);
      }
    }
  
  
    displayButtons();
  
    $(document).on("click", "#show", displayGifs);
  
    $(document).on("click", ".newGiphy", pausePlayGifs);
  
    function pausePlayGifs() {
         var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  
  });