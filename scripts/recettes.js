import { recetteParPays } from "./recettesPays.js";

// Correspondance entre les pays dans le SVG et les aires dans l'API
export const areas = {
  "États-Unis": "American",
  "Royaume-Uni": "British",
  "Canada": "Canadian",
  "Chine": "Chinese",
  "Croatie": "Croatian",
  "Pays-Bas": "Dutch",
  "Égypte": "Egyptian",
  "Philippines": "Filipino",
  "France": "French",
  "Grèce": "Greek",
  "Inde": "Indian",
  "Irlande": "Irish",
  "Italie": "Italian",
  "Jamaïque": "Jamaican",
  "Japon": "Japanese",
  "Kenya": "Kenyan",
  "Malaisie": "Malaysian",
  "Mexique": "Mexican",
  "Maroc": "Moroccan",
  "Pologne": "Polish",
  "Portugal": "Portuguese",
  "Russie": "Russian",
  "Espagne": "Spanish",
  "Thaïlande": "Thai",
  "Tunisie": "Tunisian",
  "Turquie": "Turkish",
  "Ukraine": "Ukrainian",
  "Uruguay": "Uruguayan",
  "Vietnam": "Vietnamese",
};

const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");

// Fonction pour obtenir des recettes par area
export async function obtenerRecetasPorArea(area, svgCountries, hoveredCountryIdx) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    const divRecipes = document.getElementById("recipes-container");
    divRecipes.innerHTML = "";
    divRecipes.classList.remove("local-recipes"); // Eliminar clase previa si existe

    // Crear y agregar botón cerrar
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.classList.add('close-button');
    divRecipes.appendChild(closeButton);

    // Evento para cerrar el contenedor de recetas
    closeButton.addEventListener('click', () => {
        divRecipes.innerHTML = "";
        divRecipes.classList.remove("local-recipes");
        // Aquí puedes agregar código extra para restaurar la vista, si aplica
        // Por ejemplo, ocultar el modal o mostrar el mapa de nuevo
    });

    if (data.meals && data.meals.length > 0) {
        apparition(data, area, svgCountries, hoveredCountryIdx);
    } else {
        // Si no hay recetas en la API, usar JSON local
        const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");
        console.log("País seleccionado:", countryName);

        const recettesDuPays = recetteParPays.filter(recette => recette.pays === countryName);

        console.log("Recetas encontradas en JSON:", recettesDuPays);
        if (recettesDuPays.length > 0) {
            divRecipes.classList.add("local-recipes");
            const numeroRecettes = document.createElement("h2");
            numeroRecettes.textContent = `RECETTES DE ${countryName.toUpperCase()}`;
            divRecipes.appendChild(numeroRecettes);

            recettesDuPays.forEach((recette) => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("eachMeal");
                recipeDiv.innerHTML = `
                    <h3 class="meal-title">${recette.recette}</h3>
                    <p>${recette.recetteEntier}</p>
                `;
                recipeDiv.classList.add("recipe");
                divRecipes.appendChild(recipeDiv);
            });
        } else {
            divRecipes.innerHTML += "<p>Aucune recette trouvée pour ce pays.</p>";
        }
    }
}



function apparition(data, area, svgCountries, hoveredCountryIdx) {
  const divRecipes = document.getElementById("recipes-container");
  divRecipes.innerHTML = ""; // Nettoie le conteneur

  // Créer et ajouter bouton fermer
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.classList.add('close-button');
  divRecipes.appendChild(closeButton);

  // Événement clic pour fermer la fenêtre des recettes
  closeButton.addEventListener('click', () => {
    divRecipes.innerHTML = "";
    // Ici tu peux aussi gérer la restauration de la vue (ex: réafficher la carte)
  });

  const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");

  const numeroRecettes = document.createElement("h2");
  numeroRecettes.classList.add("titreRecettes");
  numeroRecettes.innerHTML = `${data.meals.length} recettes pour "${countryName}"`;

  divRecipes.appendChild(numeroRecettes);

  data.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("eachMeal");
    recipeDiv.innerHTML = `
      <h3 class="meal-title">${meal.strMeal}</h3>
      <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    `;
    divRecipes.appendChild(recipeDiv);

    const mealImage = recipeDiv.querySelector(".meal-image");
    mealImage.addEventListener("click", () => {
      getInstructions(meal.idMeal);
    });

    getYouTubeLink(meal.idMeal, recipeDiv);
  });
}



async function getYouTubeLink(mealId, recipeDiv) {
  const mealDetailsResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const mealDetailsData = await mealDetailsResponse.json();

  const youtubeLinkElement = document.createElement("a");
  youtubeLinkElement.classList.add("youtube");
  youtubeLinkElement.target = "_blank";

  if (
    mealDetailsData.meals &&
    mealDetailsData.meals[0] &&
    mealDetailsData.meals[0].strYoutube
  ) {
    const youtubeLink = mealDetailsData.meals[0].strYoutube;
    youtubeLinkElement.href = youtubeLink;
    youtubeLinkElement.textContent = "La recette en vidéo, ici.";
  } else {
    youtubeLinkElement.href = "#"; // Optional: evitar que sea clicable
    youtubeLinkElement.textContent = "Lien bientôt disponible !";
  }

  recipeDiv.appendChild(youtubeLinkElement);
}

async function getInstructions(mealId) {
  modal.innerText = "";
  modal.style.display = "flex";
  closeModal.style.display = "flex";

  const mealDetailsResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const mealsDetailsData = await mealDetailsResponse.json();

  if (
    mealsDetailsData.meals &&
    mealsDetailsData.meals[0] &&
    mealsDetailsData.meals[0].strInstructions
  ) {
    const rawInstructions = mealsDetailsData.meals[0].strInstructions;

    // Reemplaza puntos seguidos de espacio (fin de frase) con punto + salto de línea
    const formattedInstructions = rawInstructions
      .split(/\.\s+/) // divide en cada punto seguido de espacio
      .map((sentence) => sentence.trim()) // limpia espacios
      .filter(Boolean) // elimina strings vacíos
      .map((sentence) => sentence + ".") // vuelve a poner el punto al final
      .join("<br><br>"); // salto de línea HTML

    const instructionsElement = document.createElement("p");
    instructionsElement.classList.add("instructionParagraph");
    instructionsElement.innerHTML = formattedInstructions;

    modal.appendChild(instructionsElement);
  }
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  closeModal.style.display = "none";
  
});