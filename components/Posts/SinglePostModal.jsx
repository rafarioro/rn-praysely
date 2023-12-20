import { View, Text, Pressable, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../assets/constants'
import { StyledInput , MainModalContainer, ProfileImageWrap, ThemedCloseButton, ThemeButtonText, ContentText, ImageOriginalAspectRatio, ThemeButtonWIcon } from '../../styles/style'
import { setViewSinglePost } from '../../redux/features/postSlice'
import { AntDesign, Feather } from '@expo/vector-icons'; 
import styled from 'styled-components'
import SinglePostComments from './SinglePost/SinglePostComments'


export default function SinglePostModal({  }) {

    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const { colorSheme } = useSelector(state => state.users)

    const [aspectRatio, setAspectRatio] = useState(1)

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
    
    useEffect(() => {

        if(singlePostData.hasImage){
            let uri = baseUrl + '/posts/' + singlePostData.image.imagePath2

            Image.getSize(uri, (width, height) => {
                setAspectRatio(Number(width/height).toFixed(2));
            });
        }
    }, [])




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
                            <ContentText fontSize={'11px'} > 8 hrs ago </ContentText>
                        </NameInfo>                   
                    </NameSection> 
                    <PostType>
                        <Text style={{fontSize: 10, color: '#fff', }}> {singlePostData.postType} </Text>
                    </PostType>
                </TopSection>

                <PostContentSection>

                    <ContentText style={{marginBottom: 10}}>{singlePostData.postText.text}</ContentText>

                    {
                        singlePostData.hasImage && (
                            <ImageOriginalAspectRatio 
                                aspectRatio={aspectRatio}
                                source={{ uri: baseUrl + '/posts/' + singlePostData.image.imagePath2 }}
                                />
                        )
                    }                    
                </PostContentSection>

                {/* add text input */}
                
                <InputWrap>
                    <CommentInput 
                        placeholder="Enter a comment"
                        onChangeText={setComment}
                        value={comment} 
                        />       
                    <ThemeButtonWIcon
                        style={{width: '20%', height: '100%', borderRadius: 10}}
                        >
                        <ThemeButtonText><Feather name="send" size={24}  /></ThemeButtonText>
                    </ThemeButtonWIcon>        
                </InputWrap>

                <SinglePostComments postId={singlePostData._id} />  
 
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
    margin-top: 10px; 
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
    height: fit-content;
    margin-top: 15px;
    margin-bottom: 10px;
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

const CommentInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme['mainFontColor']
  }))`
    background-color: ${(props) => props.theme['postBgColor']};
    max-width: 80%;
    width: 80%;
    border-radius: 28px;
    padding: 10px 15px;  
    color: ${(props) => props.theme['mainFontColor']};
`
const InputWrap = styled.View`
    
    display: flex;  
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

`
