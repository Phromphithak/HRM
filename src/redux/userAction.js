// src/redux/actions/userActions.js
export const loginUser = (userData) => ({
    type: 'LOGIN_USER',
    payload: userData,
});

export const clearUser = () => ({
    type: 'CLEAR_USER',
});

export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData,
});
