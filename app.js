$(document).ready(function() {
  // define variable-- animal array, we will be able to push to this array
  var animals = ["pig", "cow", "lion"];

  ///Function to render buttons
  function renderButtons() {
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
      // Then dynamicaly generating buttons for each animal in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("btn-animal btn btn-success");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-animal", animals[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }
  // Function when the "add animal button" is clicked
  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var input = $("#animal-input")
      .val()
      .trim();

    // The animal from the textbox is then added to our array
    if (jQuery.inArray(input.toLowerCase(), animals) === -1) {
      animals.push(input);
      $("#animal-input").val("");
    } else {
      alert("Already in list!");
      $("#animal-input").val("");
    }

    // calling renderButtons which handles the processing of our animal array
    renderButtons();
  });

  //Function when an animal button is clicked
  $(document).on("click", ".btn-animal", function() {
    $("#animals-view").empty();
    // Grabbing and storing the data-animal property value from the button
    var selected = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      selected +
      "&api_key=3O9QjvswDZ5Hk4kBJOPnkJ8ZHtAXDrF8&limit=10&rating=g";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .done(function(response) {
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var animalDiv = $("<div class= animal>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-state", "still");

          animalImage.attr(
            "data-still",
            results[i].images.fixed_height_still.url
          );
          animalImage.attr("data-animate", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#animals-view" div
          $("#animals-view").prepend(animalDiv);
        }
      });

      
  });
//still vs animate function
$(document).on("click", "img", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
  // Calling the renderButtons function at least once to display the initial list of animals
  renderButtons();
});
