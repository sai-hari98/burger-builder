import reducer from './auth';
import actions from '../actions/actionTypes';

const STATE = {
    userId: null,
    idToken: null,
    refreshToken: null,
    pid: null,
    loggedIn: false
}

describe('auth reducer test suite', () => {
    it('check init state', () => {
        expect(reducer(STATE, { type: '' })).toEqual(STATE);
    });
    it('check set auth', () => {
        let data = {
            localId: 'some-id',
            idToken: 'some-id-token',
            refreshToken: 'some-refresh-token',
        }
        expect(reducer(STATE, { type: actions.SET_AUTH, payload: { data: data } })).toEqual(
            {
                userId: 'some-id',
                idToken: 'some-id-token',
                refreshToken: 'some-refresh-token',
                pid: null,
                loggedIn: true
            }
        );
    });
})