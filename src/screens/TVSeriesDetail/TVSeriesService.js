import axios from "axios";

export const getSeriesDetailById=(SeriesId)=>axios.post(`https://moviepur-api.herokuapp.com/main/get/${SeriesId}`);
export const checkFavourite=(token,SeriesId)=>axios.get(`https://moviepur-api.herokuapp.com/user/${token}/${SeriesId}`);
export const sendMovieInFavList=(token,SeriesId)=>axios.put(`https://moviepur-api.herokuapp.com/user/addLikesMovie/${token}/${SeriesId}`);
export const removeMovieFromFavList=(token,SeriesId)=>axios.delete(`https://moviepur-api.herokuapp.com/user/removeLikesMovie/${token}/${SeriesId}`);
