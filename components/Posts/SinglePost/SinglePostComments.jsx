import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import { ContentText, ThemeButtonText } from '../../../styles/style'
import { getPostComments } from '../../../redux/features/postSlice' 
import { CommentItemContainer, CommentProfileImage, CommentItemContent, CommentItemInfo } from '../../../styles/comments'
import { baseUrl } from '../../../assets/constants'

export default function SinglePostComments({postId}) {


    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { comments, getCommentsLoading, getCommentsSuccess, getCommentsError } = useSelector(state => state.post)


    useEffect(() => {

        console.log('SinglePostComments: postId: ' + postId)

        dispatch(getPostComments({
            token: userData.token,
            postId: postId
        }))
    }, [postId])

    if(getCommentsLoading){
        return <ActivityIndicator style={{marginTop: 19}} />
    }else if(getCommentsError){
        return <Text> {getCommentsError} </Text>
    }else if(getCommentsSuccess){

        return (
            <CommentsContainer>
                {
                    comments.map((comment, index) => {

                        return (

                            <CommentItemContainer key={index}>
                                <CommentProfileImage>
                                    <Image 
                                        style={{width: 35, height: 35, borderRadius: 35}}
                                        source={{uri: baseUrl + '/profile/' + comment.author.profileImg.imagePath2}} 
                                        />
                                </CommentProfileImage>
                                <CommentItemContent>
                                    
                                    <CommentItemInfo>
                                        <ContentText fontSize={'12px'}>{comment.author.fullName}</ContentText>
                                        <ContentText fontSize={'11px'}>{comment.comment}  </ContentText>
                                    </CommentItemInfo>
                                    
                                
                                
                                </CommentItemContent>
                            </CommentItemContainer>
                        )

                    }   
                )}
            </CommentsContainer>
        )
    }
}


const CommentsContainer = styled.View`
    margin-top: 10px; 
    padding: 10px;
    border-radius: 8px;
`