import axios from "axios";


export const sendRequest=(request)=>axios.post(`https://moviepur-api.herokuapp.com/requset/REQUEST/${request}`);
