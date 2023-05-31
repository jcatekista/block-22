const recipesContainer = document.querySelector("#recipes-container");
const newRecipeFormContainer = document.querySelector("#new-recipe-form");

// API URL

const API_URL = "https://fsa-async-await.herokuapp.com/api/demo/recipes";

//fetch recipes
const fetchAllRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    const recipes = await response.json();

    console.log(recipes);
  } catch (error) {
    console.error(error);
  }
};

const renderAllRecipes = (recipeList) => {
  if (!recipeList || recipeList.length === 0) {
    recipesContainer.innerHTML = "<h3>No Recipes Found</h3>";
    return;
  }

  recipesContainer.innerHTML = "";

  recipeList.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");
    recipeElement.innerHTML = `
            <h4>${recipe.title}</h4>
            <img src="${recipe.image_url}" alt="${recipe.title}">
            <p>${recipe.instructions}</p>
            <button class = "delete-button" data-id = "${recipe.id}>Remove</button>
            <button class = "detail-button" data-id = "${recipe.id}>See Details</button>
            `;
    recipesContainer.appendChild(recipeElement);

    let deleteButton = recipeElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      removeRecipe(recipe.id);
    });

    let detailButton = recipeElement.querySelector(".detail-button");
    detailButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderSingleRecipe(recipe);
    });
  });
};

const renderSingleRecipe = (recipe) => {
  if (!recipe || recipe.length === 0) {
    recipesContainer.innerHTML = "<h3>No Recipe Found</h3>";
    return;
  }

  let recipeHTML = `
      <div class="single-recipe-view">
        <div class="recipe">
            <h4>${recipe.title}</h4>
            <img src="${recipe.img_url}" alt="${recipe.title}">
            <p>${recipe.instructions}</p>
        </div>

        <button class="back-button">Back</button>
      </div>
     `;

  recipesContainer.innerHTML = recipeHTML;
  let backButton = recipesContainer.querySelector(".back-button");
  backButton.addEventListener("click", async () => {
    const recipes = await fetchAllRecipes();
    renderAllRecipes(recipes);
  });
};
// init function - bootstraps

const init = async () => {
  //fetch recipes
  const recipes = await fetchAllRecipes();
  //render recipes
  renderAllRecipes(recipes);
  //create form

  console.log("Working?");
};

init();
