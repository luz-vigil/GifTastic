$(document).ready(function () {
    var newAnimals= ["panda", "leopard"]
    
    function renderButtons(){
        $("#gif-buttons").empty()

        // Loop through the array of animals, then generate buttons for each animal in the array
        for(var i=0; i< newAnimals.length; i++){
            var gifButton =  $("<button>")
           
        //its helpful when we use event listeners
            gifButton.addClass("animals");
            gifButton.attr("data-name", newAnimals[i]);
            gifButton.text(newAnimals[i]);
            $("#gif-buttons").append(gifButton)
        }

    }
    renderButtons();

    $(document).on("click", "#find-animals", function (event) {
        event.preventDefault();
        var newAnimals = $("#animalSearch").val().trim();
        animals.push(newAnimals);
        renderButtons();
    });

    $(document).on("click", ".animals", function () {
        var animals = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=4aCPsmsCn0T77A2YUnVUvvAFYd6t9it8&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class=\"animal-item\">");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").append(animalDiv);
      }
      
        })
    });
});