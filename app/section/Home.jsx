import { View, Text } from 'react-native'
import React from 'react'
import { Container, ThemeButtonText, TitleText } from '../../styles/style'
import Header from '../../components/View/Header'
import { useEffect } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import PostFeed from '../../components/Posts/PostFeed'
import { setViewPosts } from '../../redux/features/postSlice'

export default function Home() {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.users)
    const { viewPosts } = useSelector(state => state.post)

    useEffect(() => {
        console.log('Home')
    }, [])

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