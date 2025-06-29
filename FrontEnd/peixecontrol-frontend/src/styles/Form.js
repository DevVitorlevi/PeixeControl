
import styled, { keyframes, css } from 'styled-components';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Josefin Sans', sans-serif;
  display: flex;
  flex-direction: column;
  @media screen and (min-width:1180px){
    flex-direction: row;
  }

`;

export const ImageContent = styled.div`
  background-color: #085AA0;
  img{
    display: none;
  }

 @media screen and (min-width:1180px) and (max-width:1440px){
    width: 40vw;

  img{
    display: block;
  }
 }

 @media screen and (min-width:1440px){
  width: 50vw;
  img{
    display: block;
 }
}
`;

export const FormSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 1rem;
  height: 100vh;
  @media screen and (min-width: 768px) and (max-width:1180px){
    gap: 2.4rem;
    margin: 2rem;
}
@media screen and (min-width: 1180px){
  width: 60vw;
  margin: 0;

}
@media screen and (min-width:1440px){
  width: 50vw;
  margin: 0;
}

`;

export const Head = styled.div`
  span {
    font-family: 'Dalek', sans-serif;
    color: #ffd700;
  }
  color: #5A6582;
  @media screen and (min-width: 768px) and (max-width:1180px){
    font-size: 2rem;
}
@media screen and (min-width:1180px){
  font-size: 1.6rem;
}
`;

export const FormContainer = styled.div`
    form{
        display: flex;
        flex-direction: column;
        gap: .8rem;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    a{
        font-size: 1.3rem;
        transition: all .5s;
        color: #085AA0;
        margin-bottom: 1rem;
    }
    a:hover{
        color:  #ffd700;
    }
    @media screen and (min-width: 768px) and (max-width:1180px){
        a{
        font-size: 2rem;
    }
    
}
`;

export const InputContent = styled.div`
  position: relative;

  .input {
    padding: 1rem;
    border-radius: 0.8rem;
    border: 2px solid #005BBB;
    text-indent: 1.5rem;
    outline: none;
    width: 90vw;
    color:#1884f7;
    font-size:1.4rem;
  }

  .icon {
    position: absolute;
    top: 15px;
    left: 10px;
    width: 1.8rem;
    height: 1.8rem;
    color: #daa520;
  }


  .input:focus {
    border: 2px solid #f57f17;
  }

  .eye, .eye-c {
    position: absolute;
    right: 10px;
    top: 15px;
    width: 2rem;
    height: 2rem;
    color: #daa520;
    cursor: pointer;
  }

  .error-message {
    color: red;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }
  ::placeholder{
    font-size: 1.4rem;
    color: #1884f7;
  }

  @media screen and (min-width: 768px) and (max-width:1180px){
    .input{
        font-size: 2rem;
        text-indent: 2rem;
    }
    .icon{
        top: 15px;
        left: 10px;
        width: 2.4rem;
        height: 2.4rem;
    }
    ::placeholder{
    font-size: 2rem;
    
  }
  .eye, .eye-c {
    right: 10px;
    top: 15px;
    width:2.8rem;
    height:2.8rem;
  }
    .error-message {
    font-size: 1.8rem;
  }
}

@media screen and (min-width:1180px) and (max-width:1440px) {

    .input{
      width: 50vw;
    }
 }
 @media screen and (min-width:1440px){
    .input{
      width: 40vw;
    }
 }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: .5rem;
  border: 0;
  font-size: 1.4rem;
  cursor: pointer;
  background-color: #005BBB;
  color: white;
  font-family: 'Josefin Sans';
  transition: ease-in-out 0.4s;

  &:hover {
    background-color: #1884f7;
  }

  &:disabled {
    background-color: #b0c4de;
    color: #f1f1f1;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media screen and (min-width: 768px) and (max-width: 1180px) {
    font-size: 2.4rem;
  }
`;


export const PasswordCriteriaContainer = styled.div`
  width: 40vw;
  background-color: #e9f0ff;
  border: 2px solid #005bbb;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  margin: 0 auto 1rem auto;
  font-size: 1.2rem;
  color: #005bbb;
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  overflow: hidden;

  animation-fill-mode: forwards;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;

  /* Aparece se show for true, desaparece se false */
 ${({ $show }) =>
  $show
      ? css`
          animation-name: ${slideDown};
          max-height: 200px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          margin-bottom: 1rem;
        `
      : css`
          animation-name: ${slideUp};
          max-height: 0;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          margin-bottom: 0;
        `}

  @media screen and (min-width:300px) and (max-width:1179px){
      width:90vw;
      overflow-y:auto;
  }
  @media screen and (min-width:1180px)and (max-width:1439px){
      width:50vw;

  }
`;

export const CriteriaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin:1rem 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $valid }) => ($valid ? '#3BB143' : '#E02424')};
`;