import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { ContentText, ThemeButtonWIcon } from '../../styles/style' 
import { baseUrl } from '../../assets/constants'
import { useSelector, useDispatch } from 'react-redux'; 
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { setAddReply, hideCommentModal } from '../../redux/features/commentSlice'

export default function ItemModal({height}) {

    // get the items to display from viewModaData

    const { commentModalData } = useSelector(state => state.comment)

    const dispatch = useDispatch()

    const handleReply = () => { 
        dispatch(setAddReply({
            commentId: commentModalData.commentId,
        }))
        dispatch(hideCommentModal())
    }


    return (
        <ItemModalContainer
            height={height}
            >
                <LineBar></LineBar>
                {
                    commentModalData.reply &&
                    (
                        <ThemeButtonWIcon
                            onPress={handleReply}
                            >
                            <ContentText style={{marginRight: 10}} fontSize={'13px'}>
                                <Entypo name="reply" size={20}  />
                                </ContentText>
                            
                            <ContentText fontSize={'14px'}>Reply</ContentText>
                        </ThemeButtonWIcon>
                    )
                }
                {
                    commentModalData.canDelete &&
                    (
                        <ThemeButtonWIcon>
                            <ContentText style={{marginRight: 10}} fontSize={'13px'}>
                                <Entypo name="trash" size={20}  />
                            </ContentText>
                            <ContentText fontSize={'14px'}>Delete</ContentText>
                        </ThemeButtonWIcon>
                    )
                }
                {
                    commentModalData.report &&
                    (
                        <ThemeButtonWIcon>
                            <ContentText style={{marginRight: 10}} fontSize={'13px'}>
                                <Entypo name="warning" size={20}  />
                            </ContentText>
                            <ContentText fontSize={'14px'}>Report</ContentText>
                        </ThemeButtonWIcon>
                    )
                }
                {
                    commentModalData.viewReplies &&
                    (
                        <ThemeButtonWIcon>
                            <ContentText style={{marginRight: 10}} fontSize={'13px'}>
                                <MaterialCommunityIcons name="comment-multiple-outline" size={20} />
                            </ContentText>
                            <ContentText fontSize={'14px'}>View Replies</ContentText>
                        </ThemeButtonWIcon>
                    )
                }


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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px 10px 10px 10px;
    padding: 10px;
    position: relative;
    height: ${(props) => props.height + 'px'};
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const LineBar = styled.View`
    width: 50%;
    height: 4px;
    background-color: ${(props) => props.theme['borderColor']};
    margin-bottom: 10px;
    border-radius: 1px;
`
