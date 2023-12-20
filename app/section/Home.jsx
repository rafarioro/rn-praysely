import { View, Text, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Container, ThemeButtonText, TitleText } from '../../styles/style'
import Header from '../../components/View/Header' 
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import PostFeed from '../../components/Posts/PostFeed'
import { setViewPosts, setViewSinglePost } from '../../redux/features/postSlice'
import Modal from "react-native-modal";
import SinglePostModal from '../../components/Posts/SinglePostModal'


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


export default function Home() {


    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { viewPosts, viewSinglePost } = useSelector(state => state.post)

    useEffect(() => {
        console.log('Home')
    }, [])

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

    return (
        <Container>
            <Header section="Home" />

            {!userData.isOrganization && (
                <PostSelection>
                    <PostSelectionButton
                        selected={viewPosts === 'You'}
                        onPress={() => { dispatch(setViewPosts('You')) }}
                        >
                        <ThemeButtonText>You</ThemeButtonText>
                    </PostSelectionButton>
                    <PostSelectionButton
                        selected={viewPosts === 'Church'}
                        onPress={() => { dispatch(setViewPosts('Church')) }}
                        >
                        <ThemeButtonText>Church</ThemeButtonText>
                    </PostSelectionButton> 
                </PostSelection>
            )}


            <PostFeed />
            
            <Modal
                propagateSwipe={true}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                deviceWidth={dimensions.window.width}
                deviceHeight={dimensions.window.height} 
                isVisible={viewSinglePost}
                swipeDirection={'down'}
                onSwipeComplete={() => { 
                    dispatch(setViewSinglePost({
                        viewSinglePost: false,
                        singlePostData: {}
                    }));
                }}
                >
                    <SinglePostModal />
            </Modal>

        </Container>
    )
}

const PostSelection = styled.View` 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    height: fit-content;
    width: 100%;
    /* border-top: 1px solid ${(props) => props.theme['borderColor']}; */
    padding: 0 20px;
`

const PostSelectionButton = styled.Pressable`
    padding: 10px;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${(props) => props.selected ? props.theme['btnBgColor'] : 'transparent'};

`