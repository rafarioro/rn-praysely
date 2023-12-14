import { createSlice } from '@reduxjs/toolkit';
 


  const initialState = {
    colorScheme: 'light',
    loading: false,
    success: false,
    loginLoading: false,
    loginSuccess: false, 
  }

  
  
  const usersSlice = createSlice({
    name: 'users',

    initialState, 

    reducers: {
      setColorTheme: (state, action) => {
        state.colorScheme = action.payload;
      },
    },

  });
 
  export const { setColorTheme } = usersSlice.actions;
  
  export default usersSlice.reducer;