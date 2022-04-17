import axios from "axios";

export const getFavMovieById=(token)=>axios.get(`https://moviepur-api.herokuapp.com/user/${token}`)
