import React, {useEffect, useState} from 'react'; 
import { Text, View, TextInput  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Pressable } from 'react-native'; 
import { login, loginReset } from '../../redux/features/auth/userSlice';
import { StyledInput, LoginWrap, Backdrop, StyledImage, ThemeButton, Landing, LandingViewTop, LandingViewBottom } from '../../styles/style'; 
import { router } from 'expo-router';


export default function Login() {

    const dispatch = useDispatch(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginLoading, loginError, loginSuccess, userData } = useSelector(state => state.users);

    const handleLogin = () => {
        
        if(!email) return alert('Please enter your email');
        if(!password) return alert('Please enter your password');

        dispatch(login({
            email: email,
            password: password,
        }));
    }

    useEffect(() => {
        if (loginSuccess) {

            router.replace('/section/Home')
        }
    }, [loginSuccess])


    // cleanup
    useEffect(() => {
        return () => { dispatch(loginReset())}
    }, [])

    return ( 
      <Landing>
        <LandingViewTop>
          <StyledImage   
            resizeMode="contain"
            source={require('../../assets/images/lp-church-big2.jpg')} />
        </LandingViewTop>
        <LandingViewBottom>  
        </LandingViewBottom>

        <Backdrop>

            <Text> {JSON.stringify(userData)} </Text>

            <LoginWrap>
                <StyledInput
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                    value={email}
                    />
                <StyledInput
                    placeholder="Enter your password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    />               

                <ThemeButton
                    onPress={handleLogin}
                    >
                        <Text> {loginLoading ? "loading": "login"} </Text>
                </ThemeButton>

            </LoginWrap>




        </Backdrop>

      </Landing>
    )
}


