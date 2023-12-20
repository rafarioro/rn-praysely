import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import { ThemeButtonText } from '../../../styles/style'
import { getPostComments } from '../../../redux/features/postSlice' 



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
                            <View key={index}>
                                <Text>dadsfasdf </Text>
                            </View>
                        )

                    }   
                )}
            </CommentsContainer>
        )
    }
}


const CommentsContainer = styled.View`
    margin-top: 10px;
    background-color: ${props => props.theme['postBgColor']};
    padding: 10px;
    border-radius: 8px;
`