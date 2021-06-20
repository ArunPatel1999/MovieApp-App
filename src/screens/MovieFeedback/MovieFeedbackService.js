import axios from "axios";

export const sendFeedBack=(feedBack)=>axios.post(`https://moviepur-api.herokuapp.com/requset/FEEDBACK/${feedBack}`)