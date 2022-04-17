
import axios from 'axios';

export const getMostLikedTVSeries=()=>axios.get(`https://moviepur-api.herokuapp.com/type/getMostLike/Series`);
export const getLatestReleaseSeries=()=>axios.get(`https://moviepur-api.herokuapp.com/type/getByLatestReleaseDate/Series/Hollywood/10`)