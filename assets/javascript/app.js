$(document).ready(function () {
    var newAnimals = ["panda", "leopard", "owl", "whale", "dolphin", "bear", "parrot", "dog", "cat", "deer", "monkey", "fox", "tiger", "lion", "pig", "duck", "rabbit", "elephant", "horse"]

    function renderButtons() {
        $("#gif-buttons").empty()

        // Loop through the array of animals, then generate buttons for each animal in the array
        for (var i = 0; i < newAnimals.length; i++) {
            var gifButton = $("<button>")

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
        //CLEAR OUT THE previous results 
        $("#gifs-appear-here").empty();
        var animals = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=A0vtqtIBXt3cOiYglkDgMhM99rSab4wZ&limit=10";
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
                p.append("<br/> <h3>Title: " + results[i].title +"</h3>");
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

    $(document).on("click", ".animal-image", function () {
        console.log("Clicked the image to animate!");
        //GIF IMAGE STATE 
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});