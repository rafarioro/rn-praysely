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
    const { likePostSuccess, likedPostId, likePostErrorMessage, likePostLoadingId } = useSelector(state => state.post)

    useEffect(() => {
        if(userData.isOrganization){

            if(lastRenderTimeChurch && lastRenderTimeChurch > Date.now() - 60000){ return }

            dispatch(getPosts({ 
                token: userData.token,
                viewPosts: 'Church'
            }))

            return
        }
        if(viewPosts === 'You' && yourPosts && yourPosts.length > 0) {
            // if it has been less than 1 minute from the last time you rendered your posts, don't render again
            if(lastRenderTimeYours && lastRenderTimeYours > Date.now() - 60000){ return }
        }else if(viewPosts === 'Church' && churchPosts && churchPosts.length > 0) {
            if(lastRenderTimeChurch && lastRenderTimeChurch > Date.now() - 60000){ return }
        }

        dispatch(getPosts({ 
            token: userData.token,
            viewPosts: viewPosts
        }))

    } , [viewPosts, errorMessage])

    // useEffect(() => {
    //     if(likePostSuccess && likedPostId === post._id){
    //         dispatch(setLikeLoading(''))

    //     }else if(likePostErrorMessage){
    //         dispatch(setLikeLoading(''))
    //     } 
    // }, [likePostSuccess, likePostErrorMessage, likedPostId])
    
    return (
        <PostFeedView>

            {getPostsLoading && (
                <ActivityIndicator />
            )}

            {
                getPostsSuccess && viewPosts === 'You' && yourPosts.map((post, index) => {
                    return (
                        <PostItem 
                            key={index} 
                            index={index} 
                            // likeLoading={likePostLoadingId === post._id}
                            post={post}  
                            />
                    )
                })
            }
            {
                getPostsSuccess && viewPosts === 'Church' && churchPosts.map((post, index) => {
                    return (
                        <PostItem 
                            key={index}
                            // likeLoading={likePostLoadingId === post._id}
                            index={index} 
                            post={post} 
                            />
                    )
                })
            }

            
        </PostFeedView>
    )
}

const PostFeedView = styled.ScrollView`
    display: flex; 

    width: 100%;
    padding: 20px; 
`


