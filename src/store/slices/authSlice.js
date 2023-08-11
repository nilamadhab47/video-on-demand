import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authState: false,
  authUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authState = action.payload;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { setAuthToken, setAuthUser } = authSlice.actions;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;

/*
ACCESSING STATE THROUGH SELECTOR
const authState = useSelector(selectAuthState); 

UPDATING STATE
  const dispatch = useDispatch();
  
  dispatch(setAuthToken('ad213ad213'))
  dispatch(
      setAuthUser({
        comment: e.target.comment.value,
        username: user,
      })
    );
*/
