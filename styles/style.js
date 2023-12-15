import styled from 'styled-components/native';
 
export const Container = styled.SafeAreaView`
    background-color: ${(props) => props.theme['PRIMARY_COLOR']};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px; 
`;



export const Header = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
export const ThemeButton = styled.Pressable`
    padding: 10px;
    border: 1px solid ${(props) => props.theme['btnBgColor']};
`;
export const ThemeButtonText = styled.Text`
    font-size: 16px;
    color: ${(props) => props.theme['btnFontColor']};
`;
export const TitleText = styled.Text`
    font-weight: 600;
    font-size: ${(props) => props.fontSize || '18px'};
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

