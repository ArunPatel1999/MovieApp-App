import axios from "axios";


export const getMovieDetail=(movieId)=>axios.post(`https://moviepur-api.herokuapp.com/main/get/${movieId}`);

export const sendMovieInFavList=(token,movieId)=>axios.put(`https://moviepur-api.herokuapp.com/user/addLikesMovie/${token}/${movieId}`);

export const removeMovieFromFavList=(token,movieId)=>axios.delete(`https://moviepur-api.herokuapp.com/user/removeLikesMovie/${token}/${movieId}`)

export const checkFavourite=(token,movieId)=>axios.get(`https://moviepur-api.herokuapp.com/user/${token}/${movieId}`);
