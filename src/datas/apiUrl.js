import axios from "axios";

// http.js 
const getBaseUrl = () => {
    let url;
    let urlCors;
    // switch(process.env.NODE_ENV) {
    //   case 'production':
    urlCors = 'https://cors-anywhere.herokuapp.com/'
    url = 'https://absensiguru.smkrus.com/api/';
    //     break;
    //   case 'development':
    //   default:
    //     url = 'http://127.0.0.1:8000/api/';
    // }

    return url;
}

export default getBaseUrl