const { async } = require('regenerator-runtime');
import * as model from './model.js';
import { API_URL } from './config.js';
import searchview from './views/searchview.js';
import resultsview from './views/resultsView';
import paginationView from './views/paginationView.js';
// import * as recipeView from './views/recipeview.js';
import recipeView from './views/recipeview.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const rendorFunc = async function () {
  try {
    const id = window.location.hash.slice(1);
    recipeView.spinner();

    await model.loadRecipe(id);
    const data = model.state.recipe;
    controllServings();
  } catch (err) {
    recipeView.errorNotify();
  }
};
const controlSearchResults = async function () {
  try {
    let search = searchview.getValue();
    await model.loadSearchResults(search);
    paginationView.render(model.state.search);
    const mustData = model.PaginationModel();
    resultsview.render(mustData);
  } catch (err) {
    console.log(err);
  }
};
const PaginationContorler = async function (page) {
  try {
    const data = model.PaginationModel(page);
    paginationView.render(model.state.search);
    resultsview.render(data);
  } catch (err) {
    console.log(err);
  }
};

const controllServings = function (servingsNum) {
  model.UpdateServings(servingsNum);
  recipeView.render(model.state.recipe);
};
const controlBookmark = function () {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  recipeView.render(model.state.recipe);
};

const init = function () {
  searchview.addHandleEvent(controlSearchResults);
  recipeView.addHandleEvent(rendorFunc);
  paginationView.AddEventHandler(PaginationContorler);
  recipeView.addHandleServings(controllServings);
  recipeView.addHandleBookmark(controlBookmark);
};
init();
