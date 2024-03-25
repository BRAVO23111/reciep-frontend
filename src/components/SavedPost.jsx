import React, { useEffect, useState } from "react";
import axios from "axios";
import { getuserid } from "../hooks/useGetuserid";

const SavedRecipe = () => {
  const [savedRecipes, setsavedRecipes] = useState([]);
  const userid = getuserid();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/savedRecipes/${userid}`
        );
        setsavedRecipes(response.data.savedRecipes || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipes();
  }, [userid]); // Include userid in the dependency array to ensure it updates when userid changes

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div>
              <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
            </div>
            <div>
              <p className="text-gray-700 mb-2">{recipe.instruction}</p>
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                Cooking Time: {recipe.cookingTime}
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                Ingredients: {recipe.ingredients}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipe;
