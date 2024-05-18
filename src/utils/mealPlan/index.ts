/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAPIData } from "../data";

const getPlan = (data: any) => {
  // console.log("data: ", data);
  const { ID, KEY, URL } = getAPIData();
  const queryObj: any = buildQuery(data, ID, KEY);
  const promises = [],
    result: any = {};
  for (const key in queryObj) {
    const str = encodeURI(URL + queryObj[key]);
    promises.push(
      fetch(str)
        .then((res) => res.json())
        .then((data) => {
          result[key] = data.hits.slice(0, 7);
        })
        .catch((err) => console.error(err))
    );
  }
  return Promise.all(promises).then(() => {
    console.log("result: ", result);
    return result;
  });
};

// //returns an object of query strings with meal-types as keys
const buildQuery = (data: any, ID: any, KEY: any) => {
  if (!data.plan || !data.meals || !data.calories || !data.diet) {
    return false;
  }
  const type = parseInt(data.plan, 10);
  console.log("typr: ", type);
  const count = data.meals.length;
  const calories = {
    min: Math.round(parseInt(data.calories.min, 10) / count),
    max: Math.round(parseInt(data.calories.max, 10) / count),
  };
  let health = "";
  if (data.health) {
    health = stitch(data.health, "health");
  }
  const labelArr = data.meals;
  const queries: any = {};
  for (let i = 0; i < count; i++) {
    const str = labelArr[i];
    const query = `q=${str}&app_id=${ID}&app_key=${KEY}&to=${type}&diet=${data.diet}${health}&calories=${calories.min}-${calories.max}`;
    queries[str] = query;
  }
  return queries;
};

const stitch = (ob: any, label: any) => {
  let res = "&";
  for (const i in ob) {
    if (ob[i].toString() === "true") {
      res += `${label}=${i}&`;
    }
  }
  //remove that last ampersand
  return res.slice(0, -1);
};

export default getPlan;
