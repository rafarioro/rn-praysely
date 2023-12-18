import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/features/postSlice'

export default function PostFeed() {

    const dispatch = useDispatch()
    const { yourPosts, churchPosts, viewPosts, getPostsError, errorMessage, getPostsLoading, getPostsSuccess } = useSelector(state => state.post)
    const { userData } = useSelector(state => state.users)

    useEffect(() => {

        console.log('PostFeed')

        if(errorMessage) {
            console.log('yourPosts length: ' + yourPosts.length)
            console.log(' churchPosts length: ' + churchPosts.length + yourPosts[0].postText.text)
        }

        dispatch(getPosts({ 
            token: userData.token,
            viewPosts: viewPosts
        }))


    } , [viewPosts, errorMessage])

    return (
        <View>

            {getPostsLoading && (
                <ActivityIndicator />
            )}
            {
                getPostsSuccess && viewPosts === 'You' && yourPosts.map((post, index) => {
                    return (
                        <Text key={index}>
                            {post.postText.text}
                        </Text>
                    )
                })
            }
            {
                 getPostsSuccess && viewPosts === 'Church' && churchPosts.map((post, index) => {
                    return (
                        <Text key={index}>
                            {post.postText.text}
                        </Text>
                    )
                })
            }
        </View>
    )
}