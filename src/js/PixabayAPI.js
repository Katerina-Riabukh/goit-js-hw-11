import axios from "axios";


export class PixabayAPI{
    #API_KEY = "36945687-a4e7966ed6349b63eadd861cc";
    #PATH = "https://pixabay.com/api/"

    fetchImagesByQuery(keyword) {
        return axios.get(`${this.#PATH}`, {
          params: {
            key : this.#API_KEY,
            q: `${keyword}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
             page: 1,
             per_page: 40,
            }
     })
 }









    
}