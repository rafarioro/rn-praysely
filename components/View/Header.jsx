import { View, Text, Image } from 'react-native'
import React from 'react'
import { HeaderImageWrap, MainHeader, TitleText, HeaderImage } from '../../styles/style'
import { useSelector } from 'react-redux'
import { StatusBar } from 'react-native';
import Constants from "expo-constants";
import { baseUrl } from '../../assets/constants';
export default function Header({section}) {

    const { userData } = useSelector(state => state.users);

    return (
        <MainHeader
            paddingTop={Constants.statusBarHeight}  
            >
            <HeaderImageWrap>
                <HeaderImage
                    resizeMode="contain"
                    width={35}
                    height={35}
                    source={{
                        uri: baseUrl + '/profile/2023-12-03T17-31-26.616Z-Screenshot%202023-12-03%20093058.png',
                      }} />

            </HeaderImageWrap>
            <TitleText>Praysely</TitleText> 
        </MainHeader>
    )
}