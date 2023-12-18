import { View, Text, Image,Platform, Dimensions } from 'react-native'
import React from 'react'
import { HeaderImageWrap, MainHeader, TitleText, HeaderImage } from '../../styles/style'
import { useDispatch, useSelector } from 'react-redux' 
import Constants from "expo-constants";
import { baseUrl } from '../../assets/constants';
import { setViewMenuBar } from '../../redux/features/app/appSlice';
import { Redirect } from 'expo-router';
import MenuModal from '../View/MenuModal';
import { router } from 'expo-router';
import Modal from "react-native-modal"; 

export default function Header({section}) {

    const { userData } = useSelector(state => state.users);
    const { viewMenuBar } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <MainHeader
            paddingTop={Constants.statusBarHeight}  
            >
                <Modal
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutLeft'}
                    deviceWidth={windowWidth}
                    deviceHeight={windowHeight} 
                    isVisible={viewMenuBar}
                    swipeDirection="left"
                    onSwipeComplete={() => { 
                        dispatch(setViewMenuBar(false));
                    }}>
                    <MenuModal />
                </Modal>
            <HeaderImageWrap
                onPress={() => dispatch(setViewMenuBar(true))} 
                >
                    {
                        userData && (
                            <HeaderImage
                                resizeMode="contain"
                                width={35}
                                height={35}
                                source={{
                                    uri: baseUrl + '/profile/' + userData.imagePath,
                                }} 
                                />
                        )
                    }


            </HeaderImageWrap>
            <TitleText>{section ? section : 'Praysely'}</TitleText> 
        </MainHeader>
    )
}