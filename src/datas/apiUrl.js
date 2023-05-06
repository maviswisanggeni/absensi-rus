import axios from "axios";

// http.js 
const getBaseUrl = () => {
    let url;
    // switch(process.env.NODE_ENV) {
    //   case 'production':
        url = 'https://absensiguru.smkrus.com/api/';
    //     break;
    //   case 'development':
    //   default:
    //     url = 'http://127.0.0.1:8000/api/';
    // }
  
    return url;
  }
  
  export default getBaseUrl