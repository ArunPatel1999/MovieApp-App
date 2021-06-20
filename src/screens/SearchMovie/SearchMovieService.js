import axios from "axios";

export const searchMovieByName=(text)=>axios.get(`https://moviepur-api.herokuapp.com/all/name/${text}`);