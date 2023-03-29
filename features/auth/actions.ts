import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk('user', async (user) => {
  const response = await axios
    .post(
      '/api/auth/register',
      { data: user },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => res).catch((err) => err);
  return response
});

export const loginUser = createAsyncThunk('loginUser', async (loginData) => {
  return loginData
});


export const logoutUser = createAction('logoutUser');