// const { async } = require('regenerator-runtime');
const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const rendorFunc = async function() {
    let data1 = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza');
    let data2 = await data1.json();
    console.log(data1);
};

//# sourceMappingURL=index.62406edb.js.map
