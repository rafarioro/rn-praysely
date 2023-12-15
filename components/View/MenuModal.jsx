import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Container, ThemeButtonText } from '../../styles/style' 
import { useDispatch, useSelector } from 'react-redux';
import { setViewMenuBar } from '../../redux/features/app/appSlice';
import { useEffect, useState } from 'react';
import { setColorTheme } from '../../redux/features/auth/userSlice';



export default function MenuModal() {

    const dispatch = useDispatch();
    const { colorScheme } = useSelector(state => state.users);

    return (
        <Container>
            <Pressable onPress={() => {
                dispatch(setViewMenuBar(false))
                }}
                >
                <ThemeButtonText>Close</ThemeButtonText>
            </Pressable>
            <Pressable 
                style={{marginTop: 110}}

                onPress={() => {
                    dispatch(setColorTheme(colorScheme === 'light' ? 'dark' : 'light'))
                }}
                >
                <ThemeButtonText>{colorScheme }</ThemeButtonText>
            </Pressable>
        </Container>
    )
}