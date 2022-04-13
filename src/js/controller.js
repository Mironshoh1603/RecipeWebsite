const { async } = require('regenerator-runtime');
import * as model from './model.js';
// import * as recipeView from './views/recipeview.js';
import { recipeView } from './views/recipeview.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const rendorFunc = async function () {
  const id = window.location.hash.slice(1);
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
};
rendorFunc();

['load', 'hashchange'].map(val => {
  window.addEventListener(val, rendorFunc);
});
