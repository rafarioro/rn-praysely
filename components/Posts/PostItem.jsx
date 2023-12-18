import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components/native'

export default function PostItem(props) {
    return (
        <PostItemView>
            <PostText>{props.post.postText.text}</PostText>
        </PostItemView>
    )
}

const PostItemView = styled.View`
    background-color: ${(props) => props.theme['postBgColor']};
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`
const PostText = styled.Text`
    color: ${(props) => props.theme['mainFontColor']};

`