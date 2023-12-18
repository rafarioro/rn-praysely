import { View, Text, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../assets/constants'
import { ThemeButtonText } from '../../styles/style'
import { FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';

export default function PostItem(props) {

    useEffect(() => {
        console.log(props.post.user.profileImg.imagePath2)
    }, [])

    return (
        <PostItemView>

            <PostImageWrap>
                <Image 
                    source={{ uri: baseUrl + '/profile/' + props.post.user.profileImg.imagePath2 }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', borderRadius: 35 }}
                    />
            </PostImageWrap>

            <PostText>{props.post.postText.text}</PostText>

            <PostActions>
                <PostAction>
                    <ThemeButtonText>
                        <FontAwesome5 name="pray" size={18} />
                    </ThemeButtonText>
                </PostAction>
                <PostAction>
                    <ThemeButtonText>
                        <MaterialCommunityIcons name="comment-outline" size={18} />
                    </ThemeButtonText>
                </PostAction>
            </PostActions>
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

const PostImageWrap = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: transparent; 
    margin-bottom: 5px;
`

const PostActions = styled.View`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const PostAction = styled.Pressable`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 5px;

`