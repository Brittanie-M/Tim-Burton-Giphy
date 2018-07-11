$(document).ready(function() {

    //Array for searched topics to be added
    var topics = [];

  function displayNewGifs() {

	var input = $(this).data("search");
	console.log(input);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=nW31Z99cayfwRpLtWHxS1QzjxGDXWcnb&limit=10";

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
        	var showImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	showImage.attr("src", static);
        	showImage.addClass("show");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", static);
        	showImage.attr("data-animate", animated);
        	showDiv.append(p);
        	showDiv.append(showImage);
        	$("#gifDisplay").prepend(showDiv);

        }
	});
}

  //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
	$("#addButton").on("click", function(event) {
        event.preventDefault();
        var newGif = $("#gifInput").val().trim();
        topics.push(newGif);
        console.log(topics);
        $("#gifInput").val('');
        displayButtons();
      });

  //Function iterates through topics array to display button with array values in "myFaves" section of HTML
	function displayButtons() {
    $("#myFaves").empty();
    for (var i = 0; i < topics.length; i++) {
      var display = $('<button class="btn btn-primary">');
      display.attr("id", "show");
      display.attr("data-search", topics[i]);
      display.text(topics[i]);
      $("#myFaves").append(display);
    }
  }


  displayButtons();

  //Click event on button with id of "show" executes displayNewGifs function
  $(document).on("click", "#show", displayNewGifs);

  //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
  $(document).on("click", "#show", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
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