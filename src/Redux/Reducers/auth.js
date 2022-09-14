import { AUTH, LOGOUT } from "../Constants/actionTypes";

const authReducer = (state = { authData: null }, actions) => {
  switch (actions.type) {
    case AUTH:
      // console.log(actions?.payload);
      localStorage.setItem("profile", JSON.stringify({ ...actions?.payload }));
      return { ...state, authData: actions?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
