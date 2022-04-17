import { async } from 'regenerator-runtime';
import { timeoutSec } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const data = await Promise.race([fetch(url), timeout(timeoutSec)]);
    const dataJson = await data.json();
    return dataJson;
  } catch (err) {
    throw err;
  }
};
