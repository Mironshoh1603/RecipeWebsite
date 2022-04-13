import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const json = await getJSON(API_URL + id);
    const obj = json.data.recipe;
    state.recipe = {
      id: obj.id,
      time: obj.cooking_time,
      indegridents: obj.ingredients,
      image: obj.image_url,
      servings: obj.servings,
      url: obj.source_url,
      publisher: obj.publisher,
      title: obj.title,
    };
  } catch (err) {
    alert(err);
  }
};
