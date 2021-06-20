import axios from "axios";

export const getBanner=()=>axios.get(`https://moviepur-api.herokuapp.com/banner`);

export const getLatestHollywoodMovie=()=>axios.get(`https://moviepur-api.herokuapp.com/type/getByLatestReleaseDate/Movie/Hollywood/10`);

export const getLatestBollywoodMovie=()=>axios.get(`https://moviepur-api.herokuapp.com/all/getByLatestReleaseDate/Bollywood/10`);

export const getLatestTollywoodMovie=()=>axios.get(`https://moviepur-api.herokuapp.com/all/getByLatestReleaseDate/Tollywood/10`);

export const getMostLikedMovie=()=>axios.get(`https://moviepur-api.herokuapp.com/all/getMostLikeMovie`);






