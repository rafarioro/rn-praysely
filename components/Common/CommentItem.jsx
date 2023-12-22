import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import { ReplyInputWrap, ReplyInput, CommentContentWrap, CommentItemContainer, CommentItemDots, CommentProfileImage,CommentItemContent, CommentItemInfo  } from '../../styles/comments'
import { ContentText, ThemeButton, ThemeButtonWIcon } from '../../styles/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseUrl } from '../../assets/constants'
import { setReply, setViewCommentModal } from '../../redux/features/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

export default function CommentItem({ comment, index }) {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { latestReply, commentIdOfNewReply, comments, addReplyId, setReplyLoading, setReplySuccess } = useSelector(state => state.comment)

    const [replyInput, setReplyInput] = useState('')

    const handleDotsPress = () => {
        // data for comment menu items to display (like a context menu)
        let commentModalData = {
            reply: true,
            canDelete: comment.author._id === userData._id || userData.isAdmin || userData.isModerator || userData.isOrganization ? true : false,
            report: true,
            viewReplies: comment.replies && comment.replies.length > 0 ? true : false,
            commentId: comment._id,
            postId: comment.postId,
        }
 
        dispatch(setViewCommentModal({
            commentModalData: commentModalData, 
            viewCommentModal: true,
        }))
    }

    const handleReply = () => {
        if(!replyInput) return alert('Please enter a reply')

        dispatch(setReply({
            url: 'https://api.praysely.com/api/singlePost/setCommentReply',
            token: userData.token,
            postId: comment.postId,
            commentIndex: index,
            replyingTo: comment.author._id ? comment.author._id : null,
            commentId: comment._id,
            reply: replyInput,
        }))
    
        // console.log({
        //                 url: 'https://api.praysely.com/api/singlePost/setCommentReply',
        //     token: userData.token,
        //     postId: comment.postId,
        //     commentIndex: index,
        //     replyingTo: comment.author._id ? comment.author._id : null,
        //     commentId: comment._id,
        //     reply: replyInput,
        // })
    
    
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

            <CommentContentWrap>
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
            </CommentContentWrap>


            {
                addReplyId === comment._id &&
                (
                    <ReplyInputWrap>
                        <ReplyInput
                            value={replyInput}
                            onChangeText={setReplyInput}
                            placeholder={`Add Reply`}
                            
                            />         

                        <ThemeButtonWIcon 
                            style={{width: '20%', padding: 0, alignItems: 'flex-end', justifyContent: 'flex-end'}}   
                            onPress={handleReply}
                            > 
                            {
                                setReplyLoading ? 
                                (
                                    <ActivityIndicator />
                                )
                                :
                                (
                                    <ContentText fontSize={'14px'}>
                                        <Ionicons name="send-outline" size={15} />
                                    </ContentText>
                                )
                            }

                            
                        </ThemeButtonWIcon>
                    </ReplyInputWrap>
                )
            }

            {
                (setReplySuccess && commentIdOfNewReply === comment._id) && Object.keys(latestReply).length > 0 && (
                    <LatestReply>
                        <ContentText fontSize={'12px'}>{latestReply.author.fullName} - just now</ContentText>
                        <ContentText fontSize={'12px'}>{latestReply.reply}</ContentText>
                    </LatestReply>
                )
            }


        </CommentItemContainer>
    )
}

const LatestReply = styled.View`
    width: 100%;
    padding: 5px;
    border-bottom-width: 1px;
    border-bottom-color: #9b1616;
    margin-bottom: 5px;
`