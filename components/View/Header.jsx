import { View, Text, Image } from 'react-native'
import React from 'react'
import { HeaderImageWrap, MainHeader, TitleText, HeaderImage } from '../../styles/style'
import { useDispatch, useSelector } from 'react-redux' 
import Constants from "expo-constants";
import { baseUrl } from '../../assets/constants';
import { setViewMenuBar } from '../../redux/features/app/appSlice';
import { Redirect } from 'expo-router';

import { router } from 'expo-router';

export default function Header({section}) {

    const { userData } = useSelector(state => state.users);
    const { viewMenuBar } = useSelector(state => state.app);
    const dispatch = useDispatch();

    // if(viewMenuBar) {
    //     return (
    //         <Redirect href="/modal" />
    //     )
        
    // }

    return (
        <MainHeader
            paddingTop={Constants.statusBarHeight}  
            >
            <HeaderImageWrap
                onPress={() => router.replace('/modal')}
                >
                <HeaderImage
                    resizeMode="contain"
                    width={35}
                    height={35}
                    source={{
                        uri: baseUrl + '/profile/' + userData.imagePath,
                      }} />

            </HeaderImageWrap>
            <TitleText>{section ? section : 'Praysely'}</TitleText> 
        </MainHeader>
    )
}