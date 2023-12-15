import { createSlice } from '@reduxjs/toolkit';
 

const initialState = {

  viewMenuBar: false,

}

  const appSlice = createSlice({
    name: 'app',

    initialState, 

    reducers: {
      setViewMenuBar: (state, action) => {
        state.viewMenuBar = action.payload;
      },
    }  

  });
 
  export const { setViewMenuBar } = appSlice.actions;
  
  export default appSlice.reducer;