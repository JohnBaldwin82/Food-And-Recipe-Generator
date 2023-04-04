
var RECIPE_URL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=3f79b5d7&app_key=81dbb6cafe543467792c934f5e6b64ca&diet=balanced&mealType=&mealType=Breakfast&mealType=Dinner&mealType=Lunch&random=true';

// first api for meals BASE URL : GET https://api.edamam.com/api/recipes/

// global variables?

var recipeName;
var recipeObj [];
var cocktailName;
var cocktailObj []; 
// use variable object to pull localstrorage on page?

//define the function for recipe return

function getrecipeinfo(event) {
    event.preventDefault();
    results.setAttribute()// idk what to set this as i am lost here
     var searchInputEl = $("#search-ingredient-input")
     var ingredient = searchInputEl.val()



fetch(RECIPE_URL)
.then(response => response.json())
.then(response=> {

    // define variables of what we are pulling from the meal api

    var Ingredient = response.Ingredient;
    var Name = response.Name;
    var Type = response.Type; //example; american, italian, asian etc
    var Diet = response.Diet;

}
)
.catch(err => console.error(err))

}






// This is used to set/get the list of favorites localStorage item
const LS_FAVORITES = "Favorites-List";

// Favorites HTML element
var favoritesListEl = document.getElementById("favorites-list");
var favoritesMealsEl = document.getElementById("favorites-meals");
var favoritesCocktailsEl = document.getElementById("favorites-cocktails");


// Retrieve list of favorites from LocalStorage and create HTML
function loadFavorites() {

    // Remove all children nodes from favorites HTML element
    removeAllChildNodes(favoritesMealsEl);
    removeAllChildNodes(favoritesCocktailsEl);

    // Retrieve array of favorites from localStorage
    var listFavorites = JSON.parse(localStorage.getItem(LS_FAVORITES));

    // Check if list of favorites exists or is empty
    // If array is null, then save an empty array string to localStorage and stop function execution
    // If array is empty, stop function execution
    if (listFavorites === null) {
        listFavorites = [];
        localStorage.setItem(LS_FAVORITES, JSON.stringify(listFavorites));
        return;
    }
    else if (listFavorites.length === 0) {
        return;
    }

    // Loop through list of favorites and create individual HTML elements for each
    for (var i = 0; i < listFavorites.length; i++) {
        var favoriteItem = document.createElement("div");
        favoriteItem.setAttribute("data-fav-idx", i);

        var favoriteIcon = document.createElement("img");

        var favoriteName = document.createElement("h3");
        favoriteName.textContent = listFavorites[i].recipeName;

        var favoriteRemoveButton = document.createElement("button");
        favoriteRemoveButton.textContent = "Remove";

        favoriteItem.append(favoriteIcon);
        favoriteItem.append(favoriteName);
        favoriteItem.append(favoriteRemoveButton);

        if(listFavorites[i].type === "meal") {
            favoritesMealsEl.append(favoriteItem);
        } else if (listFavorites[i].type === "cocktail") {
            favoritesCocktailsEl.append(favoriteItem);
        }
    }
}

// Delete the array element from the list of favorites stored in localStorage by its index
function deleteFavorite(index) {
    // Retrieve array of favorites from localStorage
    var listFavorites = JSON.parse(localStorage.getItem(LS_FAVORITES));

    // Remove 1 array element at the specified index
    listFavorites.splice(index, 1);

    // Save updated array to localStorage
    localStorage.setItem(LS_FAVORITES, JSON.stringify(listFavorites));
}

// Remove all children nodes from parent HTML element
// Credit: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Favorites UL click handler
favoritesListEl.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    // Verify the element clicked is a <button>
    if(event.target.tagName === "BUTTON")
    {
        // Remove the button's parent element
        // event.target.parentNode.remove();

        var parentNode = event.target.parentNode;
        var favoriteIndex = parentNode.getAttribute("data-fav-idx");

        deleteFavorite(favoriteIndex);
        loadFavorites();
    }
});

// Open modal sample
var openModalBtn = document.getElementById("openModal");
openModalBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Initialize modal
    var favModal = document.getElementById("modal-favorites");
    var modalInstance = M.Modal.init(favModal);

    // Initialize collapsible list
    var favCollapsible = document.querySelectorAll('.collapsible.expandable');
    var collapsibleInstance =  M.Collapsible.init(favCollapsible, {
        accordion: false
    });

    loadFavorites();
});

// Search For a cocktail by name
async function searchCocktails(cocktailName) {
    const apiKey = "1";
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/search.php?s=${cocktailName}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
// Generate a random Cocktail
async function getRandomCocktail() {
    const apiKey = "1";
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/random.php`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
