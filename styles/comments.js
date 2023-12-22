import styled from "styled-components";

export const CommentItemContainer = styled.View`

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 10px; 
    width: 100%;
    flex: 1; 
    border-bottom-color: ${(props) => props.theme['borderColor']};
    border-bottom-width: 1px;
    padding-bottom: 13px;
    position: relative;
`

export const CommentItemDots = styled.Pressable`
    position: absolute;
    top: 0px;
    right: 0px;

`

export const CommentProfileImage = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

`

export const CommentItemContent = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start; 
    padding-left: 10px;
    border-radius: 8px;
`

export const CommentItemInfo = styled.View`
/* think name and text and time ago */
    height: 100%;
    width: 100%;
    /* background-color: ${(props) => props.theme['postBgColor']}; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px;

`