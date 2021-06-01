$(document).ready(function(){
    function loadImgs(num) {
        let div = document.getElementById("pokemones");
        for (let i = 1; i <= num; i++) {
            let img = document.createElement("img");
            img.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + i + ".png");
            img.setAttribute("id", i);
            img.setAttribute("class", "poke-img");
            div.appendChild(img); 
        }
    }
    loadImgs(151); 

    $(".poke-img").click(function () { 
        $("#poke-info").empty();
        let id = $(this).attr("id");
        $.get("https://pokeapi.co/api/v2/pokemon/" + id + "/", function(res) {
            $("#pokemones").css("width", "80vw");
            $("#poke-info").append($("<h3>", {id: "poke-name"}));
            let str = res.name;
            $("#poke-name").text(str.charAt(0).toUpperCase() + str.slice(1));
            $("#poke-info").append($("<img>", {id: "poke-img"}));
            $("#poke-img").attr("src", res.sprites.other['official-artwork'].front_default);
            $("#poke-info").append($("<h5>Types</h5>"));
            $("#poke-info").append($("<ul>", {id: "types-list"}));
            let num_types = parseInt(res.types.length);
            for (let i = 0; i < num_types; i++) {
                $("#types-list").append($("<li>", {id: "type" + i}));
                $("#type" + i).text(res.types[i].type.name);
            }
            $("#poke-info").append($("<h5>Height</h5>"));
            $("#poke-info").append($("<p>", {id: "height"}));
            $("#height").text(res.height);
            $("#poke-info").append($("<h5>Weight</h5>"));
            $("#poke-info").append($("<p>", {id: "weight"}));
            $("#weight").text(res.weight);
    }, "json");
        
    });
})