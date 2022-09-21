import { AUTH } from "../Constants/actionTypes";
import * as api from "../../api/index";

export const SignIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const SignUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
