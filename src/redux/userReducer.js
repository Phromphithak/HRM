// src/redux/userReducer.js
const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload.user, // Assuming action.payload is the user object
      };
    case 'CLEAR_USER':
      return null;
    case 'SET_USER':
      console.log('Received user data:', action.payload);
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
