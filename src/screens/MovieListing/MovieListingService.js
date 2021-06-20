import axios from "axios";

export const getFormattedMovieLiting=()=>axios.get(`https://moviepur-api.herokuapp.com/all/getFormatedDateForAndroid`);