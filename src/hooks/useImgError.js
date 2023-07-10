import defaultFoto from '../assets/images/user-foto.png'

const useImgError = (event) => {
    event.target.onerror = null;
    event.target.src = defaultFoto;
};

export default useImgError;