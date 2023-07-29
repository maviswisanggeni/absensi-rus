import { setShowPopup } from "../features/popUpSlice";
import { setIsNavigate } from "../features/popUpSlice";

const apiMiddleware = store => next => action => {
    if (action.type.endsWith('/rejected')) {
        const response = action.payload;
        console.log(response);
        if (response === "Permission denied") {
            store.dispatch(setIsNavigate(true))
        }

        if (response === 'Request failed with status code 401') {
            store.dispatch(setIsNavigate(true))
        }
    }
    return next(action);
};

export default apiMiddleware;
