import { async } from 'regenerator-runtime';
import { API_URL, STEP } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    PerPage: STEP,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const json = await getJSON(`${API_URL}${id}`);
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
    if (
      state.bookmarks.some(val => {
        return val.id === state.recipe.id;
      })
    ) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(val => {
      return {
        id: val.id,
        title: val.title,
        publisher: val.publisher,
        image: val.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const PaginationModel = function (page = state.search.page) {
  state.search.page = page;
  const start = state.search.PerPage * (page - 1);
  const last = state.search.PerPage * page;
  return state.search.results.slice(start, last);
};

export const UpdateServings = function (PeopleNum = state.recipe.servings) {
  state.recipe.indegridents.map(val => {
    val.quantity = (val.quantity * PeopleNum) / state.recipe.servings;
  });
  state.recipe.servings = PeopleNum;
  console.log(state.recipe);
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(val => val.id == id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
};
