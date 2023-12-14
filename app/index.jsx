import React from 'react'; 
import { Text, View  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Pressable } from 'react-native'; 
import { setColorTheme } from '../redux/features/auth/userSlice';
import { ThemeButtonText, Container } from '../styles/style'; 

export default function Page() {

    const dispatch = useDispatch();
    const {colorScheme} = useSelector(state => state.users);

    return ( 
      <Container>
        <ThemeButtonText >
           ddfa
        </ThemeButtonText>

        <Pressable 
          onPress={() => dispatch(setColorTheme(colorScheme === 'dark' ? 'light' : 'dark'))}
          >
          <Text>Press me</Text>
        </Pressable> 
      </Container>
    )
}


