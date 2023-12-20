import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/View/Header'

export default function SinglePost({  }) {

    const dispatch = useDispatch()

    // get data from redux store
    // should be set when user clicks on a post



    // useEffect(() => {
    //     if(!post){
    //         dispatch(getS())
    //     }
    // }, [])

    
    return (
        <View>
            <Header section= {'Post'} />
            <Text>SinglePost</Text>
        </View>
    )
}