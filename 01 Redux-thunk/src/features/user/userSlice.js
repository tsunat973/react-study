import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {fetchStart, fetchSuccess, fetchFailure } = userSlice.actions;

export const fetchUser = (username) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("ユーザーが見つかりません");
      }
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchFailure(error.message));
    }
  };
};

export default userSlice.reducer;

