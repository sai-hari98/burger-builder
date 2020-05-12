import actions from '../actions/actionTypes';
import * as utility from '../utility';
const initialState = {
    userId: null,
    idToken: null,
    refreshToken: null,
    pid: null,
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_AUTH:
            let data = action.payload.data;
            return utility.updateState(state, { userId: data.localId, idToken: data.idToken, refreshToken: data.refreshToken, loggedIn: true });
        case actions.SET_PID:
            return utility.updateState(state, { pid: action.payload.id });
        case actions.LOGOUT:
            clearInterval(state.pid);
            localStorage.removeItem('idToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('userId');
            return utility.updateState(state, { userId: null, idToken: null, refreshToken: null, pid: null, loggedIn: false });
        default:
            return state;
    }
}

export default reducer;