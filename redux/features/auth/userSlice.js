import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../apiHeaders';

const initialState = {
  colorScheme: 'light',
  userData: null,
  loading: false,
  success: false,
  loginLoading: false,
  loginSuccess: false, 

  logoutLoading: false,
  logoutSuccess: false,
  logoutError: false,


}

export const login = createAsyncThunk('users/login', async (userData) => {
  const response = await axios.post('https://api.praysely.com/api/users/login', userData, {withCredentials: true})
  return response.data
});

export const logout = createAsyncThunk('users/logout', async (data) => {
  // const token = thunkAPI.getState().userData.token
  const response = await axios.post('https://api.praysely.com/api/users/logoutUser', config(data.token))
  return response.data
} );

  const usersSlice = createSlice({
    name: 'users',
    initialState, 

    reducers: {

      reset : (state, action) => initialState,

      setColorTheme: (state, action) => {
        state.colorScheme = action.payload 
      },

      loginReset: (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginError = false;
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
        // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        .addCase(logout.pending, (state, action) => {
          state.logoutLoading = true;
          state.logoutSuccess = false;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.logoutLoading = false;
          state.logoutSuccess = true;
          
          state.userData = null;
        })
        .addCase(logout.rejected, (state, action) => {
          state.logoutLoading = false;
          state.logoutSuccess = false;
          state.logoutError = action.error.message;
        })
     
    }

  });
 
  export const { reset, setColorTheme, loginReset } = usersSlice.actions;
  
  export default usersSlice.reducer;