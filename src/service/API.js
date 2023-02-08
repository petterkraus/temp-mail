import axios from "axios";

// export default axios.create({
//   baseURL: ' https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/',
//   timeout: 10000,
//   headers: { "Content-Type": "application/json",  'X-Requested-With': 'XMLHttpRequest'  },

// });

export default axios.create({
  baseURL: ' https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/',
  timeout: 10000,
  headers: { "Content-Type": "application/json",  'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*'  },

});
