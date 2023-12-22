import styled from "styled-components";

export const CommentItemContainer = styled.View`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 10px; 
    width: 100%;
    flex: 1; 
    border-bottom-color: ${(props) => props.theme['borderColor']};
    border-bottom-width: 1px;
    position: relative;
    padding-bottom: 10px;
    height: fit-content;
`

export const CommentContentWrap = styled.View`

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

`
export const ReplyInputWrap = styled.View`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    padding: 5px;
    border-color: ${(props) => props.theme['borderColor']};
    border-width: 1px;
    border-radius: 10px;
    background-color: ${(props) => props.theme['inputBgColor']};
`

export const ReplyInput = styled.TextInput.attrs(props => ({
    placeholderTextColor: props.theme['mainFontColor'],

    }))`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 80%;
    font-size: 10px;
    color: ${(props) => props.theme['mainFontColor']};
    padding: 5px;
    padding-left: 8px; 
`

export const CommentItemDots = styled.Pressable`
    z-index: 2;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 34px;
    height: 24px;
    border-radius: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;
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
 
    width: 100%;
    /* background-color: ${(props) => props.theme['postBgColor']}; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px;

`