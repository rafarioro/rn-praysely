import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/features/postSlice'
import PostItem from './PostItem'

export default function PostFeed() {

    const dispatch = useDispatch()
    const { yourPosts, churchPosts, viewPosts, getPostsError, errorMessage, getPostsLoading, getPostsSuccess, lastRenderTimeYours, lastRenderTimeChurch } = useSelector(state => state.post)
    const { userData } = useSelector(state => state.users)

    useEffect(() => {
        if(userData.isOrganization){

            if(lastRenderTimeChurch && lastRenderTimeChurch > Date.now() - 60000){ return }

            dispatch(getPosts({ 
                token: userData.token,
                viewPosts: 'Church'
            }))

            return
        }
        if(viewPosts === 'You' && yourPosts.length > 0) {
            // if it has been less than 1 minute from the last time you rendered your posts, don't render again
            if(lastRenderTimeYours && lastRenderTimeYours > Date.now() - 60000){ return }
        }else if(viewPosts === 'Church' && churchPosts.length > 0) {
            if(lastRenderTimeChurch && lastRenderTimeChurch > Date.now() - 60000){ return }
        }

        dispatch(getPosts({ 
            token: userData.token,
            viewPosts: viewPosts
        }))

    } , [viewPosts, errorMessage])

    return (
        <PostFeedView>

            {getPostsLoading && (
                <ActivityIndicator />
            )}
            {
                getPostsSuccess && viewPosts === 'You' && yourPosts.map((post, index) => {
                    return (
                        <PostItem key={index} post={post}  />
                    )
                })
            }
            {
                getPostsSuccess && viewPosts === 'Church' && churchPosts.map((post, index) => {
                    return (
                        <PostItem key={index} post={post} />
                    )
                })
            }
        </PostFeedView>
    )
}

const PostFeedView = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
`


