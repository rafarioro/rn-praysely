import styled from 'styled-components/native';
 
export const Container = styled.SafeAreaView`
    background-color: ${(props) => props.theme['PRIMARY_COLOR']};
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0px; 
`;

export const MainMenuModalContainer = styled.SafeAreaView`
    background-color: ${(props) => props.theme['menuModalBg']};
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 60px 20px ;  
    width: 90%;
    border-radius: 0px 30px 30px 0px;
    position: relative;
`;

export const HideModalButton = styled.Pressable`

    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 2;


`

export const FlexColLeft = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;

`;



export const MainHeader = styled.View`
    /* position: absolute; */
    width: 100%;
    top: 0;
    z-index: 2;
    padding: 20px;
    padding-top: ${(props) => `${props.paddingTop+20}px` || '20px'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    background-color: ${(props) => props.theme['PRIMARY_COLOR']};

`

export const Header = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

export const HeaderImageWrap = styled.Pressable`
    width: 45px;
    height: 45px;
    border-radius: 45px;
    background-color: transparent;
    padding: 3px;
    border: 2px solid ${(props) => props.theme['TITLE_COLOR']};

`;

export const HeaderImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 45px;
`;

export const ThemeButton = styled.Pressable`
    padding: 10px;
    border: 1px solid ${(props) => props.theme['btnBgColor']};
`;

export const ThemeButtonWIcon = styled.Pressable`
    padding: 10px;
    /* border: 1px solid ${(props) => props.theme['btnBgColor']}; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) => props.justifyContent || 'center'};
`;


export const ThemeButtonText = styled.Text`
    font-size: 16px;
    color: ${(props) => props.theme['btnFontColor']};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
`;
export const TitleText = styled.Text`
    font-weight: 600;
    font-size: ${(props) => props.fontSize || '18px'};
    color: ${(props) => props.theme['TITLE_COLOR']};
`;
export const ContentText = styled.Text`
    font-weight: 500;
    font-size: ${(props) => props.fontSize || '15px'};
    color: ${(props) => props.theme['TITLE_COLOR']};
`;

export const PostContainer = styled.View`
    padding: 10px 20px;
    width: 100%;
`;
export const PostText = styled.Text`
    color: ${(props) => props.theme['SECONDARY_COLOR']};
    font-size: 16px;
    padding: 10px 0 0;
    font-weight: ${(props) => props.fontWeight || '400'};
`;


export const Landing = styled.SafeAreaView`
    background-color: #6f952e;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%; 
    position: relative;
`;

export const StyledImage = styled.Image`
     flex: 1;
`;

export const LandingViewTop = styled.View`
    height: 70%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const LandingViewBottom = styled.View`
    align-items: center;
    justify-content: center;
    height: 30%;
    width: 100%;
    background-color: #6f952e;
    padding: 20px;
`;

export const LandingButton = styled.Pressable`
    padding: 12px 30px;
    border-radius: 25px;
    border: ${(props) => props.type === 'register' ? '2px solid #fff': '3px solid #b8d65a'};
    width: 90%;
    background-color: ${(props) => props.type === 'register' ? 'transparent': '#b8d65a'};
    align-items: center;
    margin-bottom: 16px;
`

export const Backdrop = styled.View`
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    opacity: 0.7; 
    z-index: 1;
    align-items: center;
    justify-content: center;

`

export const StyledInput = styled.TextInput`
    background-color: #fff;
    width: 90%;
    border-radius: 28px;
    padding: 15px 20px;
    margin-bottom: 16px;
`

export const LoginWrap = styled.View`
    width: 100%;
    height: fit-content; 
    z-index: 2;
    align-items: center;
    justify-content: center;
`

