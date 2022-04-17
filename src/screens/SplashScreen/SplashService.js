import axios from "axios";

export const checkUserExists=(token)=>axios.get(`https://moviepur-api.herokuapp.com/user/exists/${token}`);

export const getUserByToken=(token)=>axios.get(`http://moviepur-api.herokuapp.com/user/${token}`);

export const createUserWithToken=(token)=>axios.post(`https://moviepur-api.herokuapp.com/user/${token}`);




