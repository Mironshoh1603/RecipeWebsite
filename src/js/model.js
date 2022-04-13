import { async } from 'regenerator-runtime';
export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  let data1 = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  let data2 = await data1.json();
  let obj = data2.data.recipe;
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
};
