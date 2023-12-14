import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

  // get userdata from secure storage
// const authDataStored = JSON.parse(await AsyncStorage.getItem('user'))
// const colorTheme = await AsyncStorage.getItem('colorTheme');

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('colorTheme', value);
  } catch (e) {
    console.log(e)
  }
};

const getColorSchemeFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('colorTheme');
    if (value !== null) {
      return 'light'
    }else{
      return value
    }
  } catch (e) {
    return 'light'
  }
};

let colorTheme = getColorSchemeFromStorage()

const initialState = {
  colorScheme: colorTheme ? colorTheme : 'light',
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
        state.colorScheme = action.payload
        // await AsyncStorage.setItem('colorTheme', action.payload)
      },
    },

  });
 
  export const { setColorTheme } = usersSlice.actions;
  
  export default usersSlice.reducer;