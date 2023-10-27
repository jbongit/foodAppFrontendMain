import styled from 'styled-components';
import {ReactNode}  from 'react'

interface SignInContainerProps {
  signin:boolean;
  children?:ReactNode;
}

export const Container = styled.div`
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 678px;
max-width: 100%;
min-height: 400px;
margin-top:2vh;
transform: scale(0.88);
`;

export const SignUpContainer: React.FC<SignInContainerProps> = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
 opacity: 0;
 z-index: 1;
 ${props => props.signin !== true ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 ` 
 : null}
`;


export const SignInContainer: React.FC<SignInContainerProps> = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
z-index: 2;
${props => (props.signin !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

export const Title = styled.h1`
font-weight: bold;
font-size: 2rem;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 4px 15px;
margin: 8px 0;
width: 100%;
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #ea9942;
   background-color: #ea9942;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 8px 20px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
   margin-top:1.1vh;
   margin-bottom:1vh;
`;
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
font-weight:bold;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;
export const OverlayContainer: React.FC<SignInContainerProps> = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 10;
${props =>
 props.signin !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay: React.FC<SignInContainerProps> = styled.div`
background: #ff416c;
background: -webkit-linear-gradient(to right, #ea9942, #ff416c);
background: linear-gradient(to right, #ea9942, #ff416c);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signin !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel: React.FC<SignInContainerProps> = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signin !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel: React.FC<SignInContainerProps> = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.signin !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;