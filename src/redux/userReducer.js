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
      default:
        return state;
    }
  };  

export default userReducer;
