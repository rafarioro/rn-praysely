import { View, Text, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/View/Header'
import { MainModalContainer } from '../../styles/style'
import { setViewSinglePost } from '../../redux/features/postSlice'

export default function SinglePostModal({  }) {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('SinglePostModal')
        if(Object.keys(singlePostData).length === 0){
            console.log('SinglePostModal: singlePostData is empty')
        }else{
            console.log('SinglePostModal: singlePostData is not empty')
            // console.log(singlePostData)
        }
    }
    , [])

    const { viewSinglePost, singlePostData } = useSelector(state => state.post)
    
    // check is single post data object is empty

    if(Object.keys(singlePostData).length === 0){
        return null
    }else{
        return (
            <MainModalContainer 
                > 
                <Text>SinglePost</Text>

                <Pressable onPress={() => {
                    dispatch(setViewSinglePost({
                        viewSinglePost: false,
                        singlePostData: {}
                    }));
                    }
                }>
                    <Text>{singlePostData.user.fullName}</Text>
                </Pressable>

     


            </MainModalContainer>
        )        
    }




}