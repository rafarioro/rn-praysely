import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, View , Text, ActivityIndicator} from 'react-native';
import { router } from 'expo-router';
import { ThemeButtonWIcon, ThemeButtonText , MainMenuModalContainer, HideModalButton, FlexColLeft } from '../../styles/style' 
import { useDispatch, useSelector } from 'react-redux';
import { setViewMenuBar } from '../../redux/features/app/appSlice';
import { useEffect, useState } from 'react';
import { setColorTheme, logout, reset} from '../../redux/features/auth/userSlice';
import { AntDesign } from '@expo/vector-icons'; 
import styled from 'styled-components/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';  

export default function MenuModal() {

    const dispatch = useDispatch();
    const { userData, colorScheme, logoutLoading, logoutSuccess, logoutError } = useSelector(state => state.users);



    const handleNav = (location) => {


        router.replace(location)
        dispatch(setViewMenuBar(false))
        
    }

    useEffect(() => {
        if (logoutSuccess) {
            dispatch(reset())
            router.replace('/')
        }
    }, [logoutSuccess])


    return (
        <MainMenuModalContainer>
            <HideModalButton onPress={() => {
                dispatch(setViewMenuBar(false))
                }}
                >
                <ThemeButtonText>
                    <AntDesign name="close" size={24} />
                </ThemeButtonText>
            </HideModalButton>
            <FlexColLeft>
                <ThemeButtonWIcon onPress={() => { handleNav('/section/Home') }} >
                    <ThemeButtonText> <Feather name="home" size={24}  /> </ThemeButtonText>
                    <ThemeButtonText> Home </ThemeButtonText>
                </ThemeButtonWIcon>

            </FlexColLeft>

            <FlexColLeft>
                <ThemeButtonWIcon onPress={() => { dispatch(setColorTheme(colorScheme === 'light' ? 'dark':'light')) }} >
                    <ThemeButtonText> <MaterialIcons name="invert-colors-on" size={24} /> </ThemeButtonText>
                    <ThemeButtonText> View {colorScheme === 'light' ? 'dark':'light'} theme </ThemeButtonText>
                </ThemeButtonWIcon>

            </FlexColLeft>

            <LogoutButton onPress={() => { dispatch(logout(
                {token: userData.token}
                ))}}> 
                <ThemeButtonText> <Feather name="log-out" size={24} /> </ThemeButtonText>
                <ThemeButtonText style={{marginLeft: 20}} > {logoutLoading ? <ActivityIndicator size="small" color="#8b8b8b" /> : 'Logout'} </ThemeButtonText>
            </LogoutButton>
        </MainMenuModalContainer>
    )
}

const LogoutButton = styled.Pressable`
    color: ${(props) => props.theme['btnFontColor']};
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
`
