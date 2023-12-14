import React from 'react'; 
import { Text, View  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Pressable } from 'react-native'; 
import { setColorTheme } from '../redux/features/auth/userSlice';
import { ThemeButtonText, Container, ThemeButton } from '../styles/style'; 

export default function Page() {

    const dispatch = useDispatch();
    const {colorScheme} = useSelector(state => state.users);

    return ( 
      <Container>
        <ThemeButton 
          onPress={() => dispatch(setColorTheme(colorScheme === 'dark' ? 'light' : 'dark'))}
          >
          <ThemeButtonText>Press me</ThemeButtonText>
        </ThemeButton> 
      </Container>
    )
}


