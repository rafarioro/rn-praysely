import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import { ContentText, ThemeButtonText } from '../../../styles/style'
import { getComments } from '../../../redux/features/commentSlice' 
import { CommentItemContainer, CommentProfileImage, CommentItemContent, CommentItemInfo, CommentItemDots } from '../../../styles/comments'
import { baseUrl } from '../../../assets/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentItem from '../../Common/CommentItem'


export default function SinglePostComments({postId}) {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { comments, getCommentsLoading, getCommentsSuccess, getCommentsError } = useSelector(state => state.comment)


    useEffect(() => {
        dispatch(getComments({
            url: 'https://api.praysely.com/api/singlePost/getComments',
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
                            <CommentItem
                                key={comment._id} 
                                comment={comment} 
                                index={index}  
                                />
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