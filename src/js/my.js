import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import refs from "./refs";

 
const API_KEY = "36945687-a4e7966ed6349b63eadd861cc"
const PATH = "https://pixabay.com/api/"

// const form = document.querySelector('.search-form')
// const gallery = document.querySelector('.gallery')
// const BtnLoadmore = document.querySelector('.load-more')

Notiflix.Notify.init({
  width: '480px',
  position: 'center-top',
  distance: '60px',
  opacity: 1,
  timeout: 3000,
  fontSize: '18px'
});

axios.defaults.baseURL = "https://pixabay.com/api/"

refs.form.addEventListener('submit', onFormSubmit)


function onFormSubmit(event) {
  event.preventDefault()
  refs.gallery.innerHTML = '';

  const keyword = event.currentTarget.elements.searchQuery.value.trim();
  const params = {
    key :' API_KEY ',
    q: `${keyword}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,

  }

  fetchImagesByQuery(keyword, params).then((data) => {
    console.log(data);
    galleruMarcap(data.hits)
    if (data.total !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      //BtnLoadmore.classList.remove('is-hidden')
    } else {
      return error;
    }
  
    
  }).catch((error) => {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }).finally(() => {
      refs.form.reset()
  })
  
}

async function fetchImagesByQuery(keyword, params) {
    try {
        const { data } = await axios({
            params: {
            key : API_KEY,
            q: `${keyword}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            }
        });
        
        return data;
        
    }
    catch (error) {
     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } 
      
  }


function galleruMarcap(query){
  
  const marcap = query.map(({webformatURL, largeImageUR, tags, likes, views, comments, downloads}) => {
       
        return `<div class="photo-card">
 <a href ="${largeImageUR}"> <img class ='gellary-img'src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
    }).join('')
    refs.gallery.insertAdjacentHTML('afterbegin', marcap)
}










// Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);



// const keyword = 'лев'
// const params = {
//     key :' API_KEY ',
//     q: `${keyword}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
// }



// fetchImages(keyword, params).then((data) => {
//     galleruMarcap(data.hits)
//     if (data.totalHits > 0 ) {
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//     }
    
// }).catch((error) => {
//      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
// })


// fetch("https://pixabay.com/api/?key=" + API_KEY + "&" + params + "").then((responce) => {
//     return responce.json()
// }).then((query) => {
//     console.log(query);
//     galleruMarcap(query.hits)
// }).catch((error) => {
//    // console.log("Sorry, there are no images matching your search query. Please try again.");
//      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
// })