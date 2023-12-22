import { View, Text, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { CommentItemContainer, CommentItemDots, CommentProfileImage,CommentItemContent, CommentItemInfo  } from '../../styles/comments'
import { ContentText } from '../../styles/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseUrl } from '../../assets/constants'
import { setViewCommentModal } from '../../redux/features/postSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function CommentItem({ comment, index }) {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { viewCommentModal, comments } = useSelector(state => state.post)

    const handleDotsPress = () => {

        let commentModalData = {
            reply: true,
            canDelete: comment.author._id === userData._id || userData.isAdmin || userData.isModerator || userData.isOrganization ? true : false,
            report: true,
            viewReplies: comment.replies && comment.replies.length > 0 ? true : false,
            commentId: comment._id,
            postId: comment.postId,
        }

        console.log(commentModalData)

        dispatch(setViewCommentModal({
            commentModalData: commentModalData, 
            viewCommentModal: true,
        }))
    }

    return (
        <CommentItemContainer key={index}>
            <CommentItemDots
                onPress={handleDotsPress}
                >
                <ContentText>
                    <MaterialCommunityIcons name="dots-vertical" size={15} />
                </ContentText>
            </CommentItemDots> 
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
}