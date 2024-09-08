import axios from "axios";


const http = axios.create({
    baseURL: process.env.VUE_API_URL,
    headers: {
      "content-type": 'application/json',
    }
  })


export default http;