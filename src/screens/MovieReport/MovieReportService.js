import axios from "axios";


export const sendReport=(report)=>axios.post(`https://moviepur-api.herokuapp.com/requset/OBJECTION/${report}`)
