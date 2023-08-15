import defaultFoto from '../assets/images/user-foto.png'

const imgErrorValidation = (event) => {
    event.target.onerror = null;
    event.target.src = defaultFoto;
};

export default imgErrorValidation;