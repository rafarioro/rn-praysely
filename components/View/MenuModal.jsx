import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Container, ThemeButtonText , MainMenuModalContainer, HideModalButton, FlexColLeft } from '../../styles/style' 
import { useDispatch, useSelector } from 'react-redux';
import { setViewMenuBar } from '../../redux/features/app/appSlice';
import { useEffect, useState } from 'react';
import { setColorTheme } from '../../redux/features/auth/userSlice';
import { AntDesign } from '@expo/vector-icons'; 


export default function MenuModal() {

    const dispatch = useDispatch();
    const { colorScheme } = useSelector(state => state.users);

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
                <Pressable  
                    onPress={() => {
                        dispatch(setColorTheme(colorScheme === 'light' ? 'dark' : 'light'))
                    }}
                    >
                    <ThemeButtonText>{colorScheme }</ThemeButtonText>
                </Pressable>
                <Pressable  
                    onPress={() => {
                        dispatch(setColorTheme(colorScheme === 'light' ? 'dark' : 'light'))
                    }}
                    >
                    <ThemeButtonText>{colorScheme }</ThemeButtonText>
                </Pressable>
            </FlexColLeft>
        </MainMenuModalContainer>
    )
}