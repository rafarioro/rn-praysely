import { View, Text, Image } from 'react-native'
import React, {useState} from 'react'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../assets/constants'
import { ThemeButtonText, ProfileImageWrap } from '../../styles/style'
import { FontAwesome5,  MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native'
import { likePost, setLikeLoading, setViewSinglePost } from '../../redux/features/postSlice'
import { router } from 'expo-router'
// import SinglePostComments from './SinglePost/SinglePostComments'


export default function PostItem({ index , post }) {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { likePostSuccess, likedPostId, likePostErrorMessage, isUnlikedId } = useSelector(state => state.post)
    const [isLiked, setIsLiked] = useState(false)
    const [isLikeLoading, setIsLikeLoading] = useState(false)


    useEffect(() => {
        if(post.likes.length > 0){
            post.likes.includes(userData._id) ? setIsLiked(true) : setIsLiked(false)
        }
    }, [])

    const handleLike = () => {
        setIsLikeLoading(true) 

        dispatch(likePost({
            token: userData.token,
            postId: post._id,
            index: index
        }))
    }

    useEffect(() => {
        if(likePostSuccess && likedPostId === post._id){
            // dispatch(setLikeLoading(''))
            setIsLikeLoading(false)

            if(isUnlikedId === post._id){
                setIsLiked(false)
            }else{
                setIsLiked(true) 
            } 
        }else if(likePostErrorMessage){
            dispatch(setLikeLoading(''))
            setIsLikeLoading(false)
        } 
    }, [likePostSuccess, likePostErrorMessage, likedPostId])
    
    const handleNav = () => {
        
        dispatch(setViewSinglePost({
            viewSinglePost: false,
            singlePostData: post
        }))

        router.push(`/post/${post._id}`)

    }


    return (
        <PostItemView>
            <ProfileImageWrap>
                <Image 
                    source={{ uri: baseUrl + '/profile/' + post.user.profileImg.imagePath2 }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', borderRadius: 35 }}
                    />
            </ProfileImageWrap>

            <PostText>{post.postText.text}</PostText>

            {
                post.hasImage && (
                    <Image 
                        source={{ uri: baseUrl + '/posts/' + post.image.imagePath2 }}
                        resizeMode='cover'
                        style={{ width: '100%', height: 200, borderRadius: 5 }}
                        />
                )
            }

            <PostActions>
                <PostAction
                    onPress={handleLike}
                    > 
                    <PostActionText
                        fill={isLiked ? '#00B4CC' : false}
                        >
                            {
                                (isLikeLoading) ? (
                                    <ActivityIndicator />
                                ) : ( 
                                    <FontAwesome5 name="pray" size={15} />
                                )
                            } 
                    </PostActionText>                    
                    <PostActionText style={{marginLeft: 5, fontSize: 11}}>
                        {post.likes.length}
                    </PostActionText>
                </PostAction>
                <PostAction 
                    onPress={handleNav}
                    > 
                    <PostActionText>
                        <MaterialCommunityIcons name="comment-outline" size={15}  />
                    </PostActionText>
                    <PostActionText style={{marginLeft: 5, fontSize: 11}}>
                        {post.comments.length}
                    </PostActionText>
                </PostAction>
            </PostActions>
        </PostItemView>
    )
}

const PostItemView = styled.View`
    background-color: ${(props) => props.theme['postBgColor']};
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`
const PostText = styled.Text`
    color: ${(props) => props.theme['mainFontColor']};
`

const PostImageWrap = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: transparent; 
    margin-bottom: 5px;
`

const PostActions = styled.View`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const PostAction = styled.Pressable`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 5px;

`

const PostActionText = styled.Text`    
    font-size: 16px;
    color: ${(props) => props.fill ? props.fill : props.theme['mainFontColor']};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`