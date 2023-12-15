import React from 'react'; 
import { Text, View, Image  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Pressable } from 'react-native'; 
import { setColorTheme } from '../redux/features/auth/userSlice';
import { LandingButton, StyledImage, ThemeButton, Landing, LandingViewTop, LandingViewBottom } from '../styles/style'; 
import { router } from 'expo-router';


export default function Page() {
    const dispatch = useDispatch();
    const {colorScheme} = useSelector(state => state.users);

    return ( 
      <Landing>
        <LandingViewTop>
          <StyledImage   
            resizeMode="contain"
            source={require('../assets/images/lp-church-big2.jpg')} />
        </LandingViewTop>
        <LandingViewBottom>  
          <LandingButton
            onPress={() => router.replace('/section/Login')}
            >
            <Text>Login</Text>
          </LandingButton>
          <LandingButton
            type="register"
            >
            <Text style={{color: 'white'}}>Register</Text>
          </LandingButton>
        </LandingViewBottom>
      </Landing>
    )
}


