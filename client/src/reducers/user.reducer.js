import {REGISTER_USER, LOGIN_USER, AUTH_USER, LOGOUT_USER} from '../actions/types';

const initialState = {
    isAuth: false,
    loading: true,
    userData: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        case LOGIN_USER:
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.data.loggedIn,
                loading: false
            };

        case AUTH_USER:
            return {
                ...state,
                userData: action.payload,
                isAuth: action.payload.isAuth,
                loading: false
            };

        case LOGOUT_USER:
            //Remove userId from localStorage
            localStorage.removeItem("userId");

            return {
                ...state,
                userData: null,
                isAuth: false,
                loading: false
            };
    
        default:
            return state;
    }
}
