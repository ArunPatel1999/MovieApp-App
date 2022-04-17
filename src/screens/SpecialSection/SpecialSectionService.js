import axios from "axios";

export const getMovieParts=()=>axios.get(`https://moviepur-api.herokuapp.com/filmSeries`);