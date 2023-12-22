import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { ContentText } from '../../styles/style' 
import { baseUrl } from '../../assets/constants'
import { useSelector, useDispatch } from 'react-redux'; 

export default function ItemModal({height}) {
    return (
        <ItemModalContainer
            height={height}
            >
            <ItemWrap>
                <ContentText>Item Modal</ContentText>
            </ItemWrap>
        </ItemModalContainer>
    )
}

const ItemWrap = styled.View`

    border-radius: 10px;
    background-color: #fff;

`
const ItemModalContainer = styled.SafeAreaView`
    background-color: ${(props) => props.theme['menuModalBg']};
    display: flex;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
    position: relative;
    height: ${(props) => props.height + 'px'};
    position: absolute;
    bottom: 0;
    width: 100%;
`;
