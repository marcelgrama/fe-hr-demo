import { createReducer } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './actions';

export interface JobsState {
  userData: {}
  pending: boolean;
  error: boolean;
};

export type Payload = {
  data: { items_by_column_values: any[]; };
};
export type ItemType = {
  column_values: { text: string, value: string }[],
  id: string,
  name: string
};


const initialState: JobsState = {
  userData: {},
  pending: false,
  error: false,
};


export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.pending = true;
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.pending = false;
    })
    .addCase(registerUser.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(loginUser.pending, (state) => {
      state.pending = true;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.userData = {
        ...payload?.data,
        isAuthenticated: payload?.status === "authenticated" ? true : false
      };
    })
    .addCase(loginUser.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(logoutUser, (state) => {
      state.userData = {

      };
    })
});

export default userReducer;
