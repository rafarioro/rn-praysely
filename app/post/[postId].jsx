import { View, Text, Pressable, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/View/Header'
import { baseUrl } from '../../assets/constants'
import { StyledInput, MainPageContainer, ProfileImageWrap, ThemedCloseButton, ThemeButtonText, ContentText, ImageOriginalAspectRatio, ThemeButtonWIcon } from '../../styles/style'
import { setViewSinglePost, setSinglePostComment, getSinglePost, setViewCommentModal } from '../../redux/features/postSlice'
import { AntDesign, Feather } from '@expo/vector-icons'; 
import styled from 'styled-components'
import SinglePostComments from '../../components/Posts/SinglePost/SinglePostComments'
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import ItemModal from '../../components/Common/ItemModal'
import Modal from "react-native-modal";

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


export default function SinglePost() {
 
    const dispatch = useDispatch()
    const [comment, setComment] = useState('') 
    const { userData } = useSelector(state => state.users)
    const {singlePostLoading, singlePostSuccess, setCommentLoading, setCommentSuccess, viewCommentModal} = useSelector(state => state.post)
    const [aspectRatio, setAspectRatio] = useState(1)

    const { postId } = useLocalSearchParams()

    useEffect(() => { 

        if(Object.keys(singlePostData).length === 0){

            dispatch(getSinglePost({   
                token: userData.token,
                postId: postId
             }))
        }
    } , [])


    const { viewSinglePost, singlePostData } = useSelector(state => state.post)
    
    useEffect(() => {

        if(singlePostData.hasImage){
            let uri = baseUrl + '/posts/' + singlePostData.image.imagePath2

            Image.getSize(uri, (width, height) => {
                setAspectRatio(Number(width/height).toFixed(2));
            });
        }
    }, [])

    const handleSetComment = () => {
        if(!comment) return alert('Please enter a comment')

        dispatch(setSinglePostComment({
            token: userData.token,
            postId: postId,
            comment: comment,
            residingId: userData.memberOf[0]
        }))
    }

    useEffect(() => {
        if(setCommentSuccess){
            setComment('')
        }
    }, [setCommentSuccess])

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
    });

    if(singlePostLoading || Object.keys(singlePostData).length === 0){
        return <ActivityIndicator style={{marginTop: 19}} />
    }else if(Object.keys(singlePostData).length > 0){
        return (
            <MainPageContainer>

                <TopSection>
                    <NameSection>
                        <ProfileImageWrap>
                            {
                                singlePostData.user.profileImg && (
                                    <Image 
                                        source={{ uri: baseUrl + '/profile/' + singlePostData.user.profileImg.imagePath2 }}
                                        resizeMode="cover"
                                        style={{ width: '100%', height: '100%', borderRadius: 35 }}
                                        />
                                )
                            }

                        </ProfileImageWrap>         
                        <NameInfo>
                            <ContentText>{singlePostData.user.fullName}</ContentText>
                            <ContentText fontSize={'11px'} > 8 hrs ago </ContentText>
                        </NameInfo>                   
                    </NameSection> 
                    <PostType>
                        <Text style={{fontSize: 10, color: '#fff', }}> {singlePostData.postType} </Text>
                    </PostType>
                </TopSection>

                <PostContentSection>

                    <ContentText style={{marginBottom: 10}}>{singlePostData.postText.text}</ContentText>

                    {
                        singlePostData.hasImage && (
                            <ImageOriginalAspectRatio 
                                aspectRatio={aspectRatio}
                                source={{ uri: baseUrl + '/posts/' + singlePostData.image.imagePath2 }}
                                />
                        )
                    }                    
                </PostContentSection>

                {
                    !singlePostData.commentsDisabled && (
                        <InputWrap>
                            <CommentInput 
                                placeholder="Enter a comment"
                                onChangeText={setComment}
                                value={comment} 
                                />       
                            <ThemeButtonWIcon
                                onPress={handleSetComment}
                                style={{width: '20%', height: '100%', borderRadius: 10}}
                                >
                                <ThemeButtonText>
                                    {
                                        setCommentLoading ? 
                                        (
                                            <ActivityIndicator />
                                        )
                                        :
                                        (
                                            <Feather name="send" size={24}  />
                                        )
                                    }
                                    
                                </ThemeButtonText>
                            </ThemeButtonWIcon>        
                        </InputWrap>                        
                    )
                }

                {
                    singlePostData.commentsDisabled ? 
                    (
                        <NoCommentsView>
                            <ContentText>Comments Disabled</ContentText>
                        </NoCommentsView>
                    )
                    :
                    (
                        <SinglePostComments postId={postId} /> 
                    )
                }

                <Modal
                    propagateSwipe={true}
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    deviceWidth={dimensions.window.width}
                    deviceHeight={(dimensions.window.height)*0.5} 
                    isVisible={viewCommentModal}
                    swipeDirection={'down'}
                    onSwipeComplete={() => { 
                        dispatch(setViewCommentModal({
                            viewCommentModal: false,
                            commentModalData: {}
                        }));
                    }}
                    >
                    <ItemModal 
                        height={dimensions.window.height*0.5} 
                        />
                </Modal>

            </MainPageContainer>
        )        
    }
}

const NoCommentsView = styled.View`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const TopSection = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin-top: 20px; 
`
const NameSection = styled.View` 
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;  
    height: 40px;  
`

const NameInfo = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center; 
    margin-left: 10px;
`

const PostContentSection = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;  
    width: 100%;
    height: fit-content;
    margin-top: 15px;
    margin-bottom: 10px;
`

const PostType = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    padding: 5px;  
    background-color: #00B4CC;
    border-radius: 10px;
    margin-left: 8px;

`

const CommentInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme['mainFontColor']
  }))`
    
    max-width: 80%;
    width: 80%;
    
    padding: 10px 15px;  
    color: ${(props) => props.theme['mainFontColor']};
`
const InputWrap = styled.View`
    
    display: flex;  
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    width: 100%;
    background-color: ${(props) => props.theme['postBgColor']};
`
