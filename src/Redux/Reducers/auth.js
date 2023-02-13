import { AUTH, LOGOUT } from "../Constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // console.log(actions?.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload, loading: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false };

    default:
      return state;
  }
};

export default authReducer;
