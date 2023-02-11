import axios from "axios";

export default axios.create({
  baseURL: 'https://dropmailproxy.onrender.com/',
  timeout: 25000,
  headers: { "Content-Type": "application/json",  'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*'  },

});
