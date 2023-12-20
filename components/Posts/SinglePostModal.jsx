import { View, Text, Pressable, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../assets/constants'
import { StyledInput, MainModalContainer, ProfileImageWrap, ThemedCloseButton, ThemeButtonText, ContentText, ImageOriginalAspectRatio } from '../../styles/style'
import { setViewSinglePost } from '../../redux/features/postSlice'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components'
import TimeAgo from 'react-native-timeago';
// import moment from 'moment';

let timestamp = "2015-06-21T06:24:44.124Z";

export default function SinglePostModal({  }) {

    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    useEffect(() => {
        console.log('SinglePostModal')
        if(Object.keys(singlePostData).length === 0){
            console.log('SinglePostModal: singlePostData is empty')
        }else{
            console.log('SinglePostModal: singlePostData is not empty')
            // console.log(singlePostData)
        }
    }
    , [])

    const { viewSinglePost, singlePostData } = useSelector(state => state.post)
    
    // check is single post data object is empty

    if(Object.keys(singlePostData).length === 0){
        return null
    }else{
        return (
            <MainModalContainer>

                <ThemedCloseButton onPress={() => { dispatch(setViewSinglePost({ viewSinglePost: false, singlePostData: {} })) }} >
                    <ThemeButtonText> <AntDesign name="close" size={19}  /> </ThemeButtonText> 
                </ThemedCloseButton>
 
                <TopSection>
                    <NameSection>
                        <ProfileImageWrap>
                            <Image 
                                source={{ uri: baseUrl + '/profile/' + singlePostData.user.profileImg.imagePath2 }}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%', borderRadius: 35 }}
                                />
                        </ProfileImageWrap>         
                        <NameInfo>
                            <ContentText>{singlePostData.user.fullName}</ContentText>
                            <ContentText fontSize={'11px'} > <TimeAgo time={timestamp} /></ContentText>
                        </NameInfo>                   
                    </NameSection> 
                    <PostType>
                        <Text style={{fontSize: 10, color: '#fff', }}> {singlePostData.postType} </Text>
                    </PostType>
                </TopSection>

                <PostContentSection>

                    <ContentText>{singlePostData.postText.text}</ContentText>

                    {
                        singlePostData.hasImage && (
                            <Image 
                                source={{ uri: baseUrl + '/posts/' + singlePostData.image.imagePath2 }} 
                                style={{ width: "100%", resizeMode: "contain", height: undefined, aspectRatio: 1, }}
                                />
                        )
                    }                    
                </PostContentSection>

                {/* add text input */}

                <StyledInput
                    placeholder="Enter a comment"
                    onChangeText={setComment}
                    value={comment}
                    />
                
 
            </MainModalContainer>
        )        
    }
}

const TopSection = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    
`
const NameSection = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;  
    height: 40px;  
`

const NameInfo = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center; 
    margin-left: 10px;
`

const PostContentSection = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;  
    width: 100%;
    padding: 5px;  
`

const PostType = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    padding: 5px;  
    background-color: #00B4CC;
    border-radius: 10px;
    margin-left: 8px;

`