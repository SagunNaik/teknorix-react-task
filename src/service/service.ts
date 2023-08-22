import { BASE_API_URL } from "../utilities/constants";

const fetchOptions ={
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }

export const getCall = (url:string) => fetch(`${BASE_API_URL}${url}`,{method:"GET"}).then(res => res.json()).catch(error => error); 
export const postCall = (url:string,body:string) => fetch(`${BASE_API_URL}${url}`,{ method:"POST",body: body}).then(res => res.json()).catch(error => error); 