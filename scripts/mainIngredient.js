async function getRecipesByIngredients(type) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Données reçues : ", data);

    return data.meals;
}

const imageContainers = document.querySelectorAll('.image-container');
const imagesDiv = document.querySelector('.images');

imageContainers.forEach(container => {
    const image = container.querySelector('img');
    image.addEventListener('click', async (event) => {
        const type = container.id;
        const meals = await getRecipesByIngredients(type);

        // Ocultar todas las demás imágenes y mostrar solo la seleccionada
        imageContainers.forEach(c => {
            if (c !== container) {
                c.style.display = 'none';
            } else {
                c.style.display = 'flex';
                c.style.justifyContent = 'center';
            }
        });

        // Eliminar resultados anteriores si existen
        const oldRecipesContainer = document.querySelector('.recipes-container');
        if (oldRecipesContainer) {
            oldRecipesContainer.remove();
        }

        // Crear contenedor para recetas
        const divRecipes = document.createElement("div");
        divRecipes.classList.add("recipes-container");

        // Botón de cerrar
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('close-button');
        divRecipes.appendChild(closeButton);

        // Mostrar recetas
        if (meals) {
            meals.forEach((meal) => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

                recipeDiv.innerHTML = `
    <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
    <h3 class="meal-title">${meal.strMeal}</h3>
`;

                divRecipes.appendChild(recipeDiv);
            });
        }

        // Insertar recetas después del contenedor de imágenes
       const allImg = document.querySelector('.content-all-img');
    allImg.appendChild(divRecipes);

        // Evento para cerrar recetas y volver a mostrar todas las imágenes
        closeButton.addEventListener('click', () => {
            divRecipes.remove();
            imageContainers.forEach(c => {
                c.style.display = 'flex';
            });
        });
    });
});
