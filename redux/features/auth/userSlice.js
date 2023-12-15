import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  colorScheme: 'light',
  userData: null,
  loading: false,
  success: false,
  loginLoading: false,
  loginSuccess: false, 
}

export const login = createAsyncThunk('users/login', async (userData) => {
  const response = await axios.post('https://api.praysely.com/api/users/login', userData, {withCredentials: true})
  return response.data
});

  const usersSlice = createSlice({
    name: 'users',
    initialState, 

    reducers: {
      setColorTheme: (state, action) => {
        state.colorScheme = action.payload 
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state, action) => {
          state.loginLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loginLoading = false;
          state.loginSuccess = true;
          state.userData = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loginLoading = false;
          state.loginSuccess = false;
          state.loginError = action.error.message;
        })
     
    }

  });
 
  export const { setColorTheme } = usersSlice.actions;
  
  export default usersSlice.reducer;