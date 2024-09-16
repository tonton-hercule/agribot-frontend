import axios from "axios";


const http = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      "content-type": 'application/json',
    }
  })

  // Fonction pour afficher le popup
function showPopup() {
  document.getElementById('custom-popup').style.display = 'flex';
}

// Fonction pour masquer le popup
function hidePopup() {
  document.getElementById('custom-popup').style.display = 'none';
}

// Créez une variable pour suivre l'état du chargement
let isLoading = false;

//créer un intercepteur
http.interceptors.request.use(config => {
 
  if (!isLoading) {
    showPopup();
    // Mettre à jour l'état du chargement
    isLoading = true;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
})


// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Masquer le loader
  setTimeout(() => {
    hidePopup();

    isLoading = false;
  }, 2000)

  return response;
}, async function (error) {

  if (error.response && error.response.status === 401) {
     // Masquer le loader après l'actualisation du token
     hidePopup();
     isLoading = false;
  } 
  // Masquer le loader après l'actualisation du token
  hidePopup();
  isLoading = false;
  
});


export default http;