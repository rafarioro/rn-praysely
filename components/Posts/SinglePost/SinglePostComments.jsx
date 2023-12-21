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
                    comments && comments.length > 0 ? 
                    (
                        comments.map((comment, index) => {

                            return (

                                <CommentItemContainer key={index}>
                                    <CommentProfileImage>
                                        {
                                            comment.author.profileImg &&
                                            (
                                                <Image 
                                                    style={{width: 35, height: 35, borderRadius: 35}}
                                                    source={{uri: baseUrl + '/profile/' + comment.author.profileImg.imagePath2}} 
                                                    />
                                            )
                                        }

                                    </CommentProfileImage>
                                    <CommentItemContent>
                                        
                                        <CommentItemInfo>
                                            <ContentText fontSize={'12px'}>{comment.author.fullName}</ContentText>
                                            <ContentText fontSize={'11px'}>{comment.comment}  </ContentText>
                                        </CommentItemInfo>
                                        
                                    </CommentItemContent>
                                </CommentItemContainer>
                            )
                        })                     
                    )
                    :
                    (
                        <NoCommentsView>
                            <ContentText fontSize={'12px'}>No comments yet</ContentText>
                        </NoCommentsView>
                    )
 
                }
            </CommentsContainer>
        )
    }
}

const NoCommentsView = styled.View`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CommentsContainer = styled.View`
    margin-top: 10px; 
    padding: 10px;
    border-radius: 8px;
`