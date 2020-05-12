import actions from './actionTypes';
import axios from 'axios';
export const setAuth = (data) => {
    return {
        type: actions.SET_AUTH,
        payload: {
            data: data
        }
    }
}

export const initAuthStorage = (data) => {
    return (dispatch, getState) => {
        dispatch(setAuth(data));
        refreshTokenFunc(dispatch, getState);
    }
}

export const logOut = () => {
    return {
        type: actions.LOGOUT
    }
}

const setId = (id) => {
    return {
        type: actions.SET_PID,
        payload: {
            id: id
        }
    }
}

export const refreshToken = () => {
    return (dispatch, getState) => {
        refreshTokenFunc(dispatch, getState);
    }
}

const refreshTokenFunc = (dispatch, getState) => {
    let id = setInterval(() => {
        axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyD4_db1tQSA-WN_lmV1nexNukH8BOX0m9c', { refresh_token: getState().auth.refreshToken, grant_type: 'refresh_token' })
            .then(response => {
                let data = {
                    idToken: response.data.id_token,
                    refreshToken: response.data.refresh_token,
                    localId: response.data.user_id
                }
                dispatch(setAuth(data));
            }).catch(error => {

            });
    }, (1000 * 60 * 60));
    dispatch(setId(id));
}