import axios from "axios";

export const getMovieByIndustryName=(industryName)=>axios.get(`https://moviepur-api.herokuapp.com/all/getByIndustryName/${industryName}`);

export const getMoviebyMovieType=(typeOf,industory)=>axios.get(`https://moviepur-api.herokuapp.com/all/getByGenreAndIndustryName/${typeOf}/${industory}`);

export const getMoviePartById=(movieId)=>axios.get(`https://moviepur-api.herokuapp.com/filmSeries/${movieId}`);

export const getlatestAddedMovie=()=>axios.get(`https://moviepur-api.herokuapp.com/all/getLatestAdd`);
