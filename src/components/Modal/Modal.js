import React from 'react';
import styled, {keyframes} from 'styled-components';
import close from '../../assets/images/cross.svg';

const scale = keyframes`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}`;

const ModalStyled = styled.div`
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: ${({active}) => active ? 'flex' : 'none'};
justify-content: ${({active}) => active && 'center'};
align-items: ${({active}) => active && 'center'};
background: rgba(0,0,0, 0.5);
`;

const ContainerStyled = styled.div`
background-color: white;
border-radius: 16px;
min-width: 250px;
position: relative;
animation: ${({active}) => active && scale} .3s ease-out;
`;

const  ModalHeaderStyled = styled.div`
padding: 8px;
margin: 0 20px;
text-align: center;
`;

const ContentStyled = styled.div`
padding: 20px;
`;

const CloseStyled = styled.img`
position: absolute;
top: 8px;
right: 8px;
cursor: pointer;
&:hover {
    opacity: .5;
    animation: ${rotate} .5s ease-out;
}
`


const Modal = ({children, title, visible, setVisible}) => {
    return (
        <ModalStyled active={visible} onClick={setVisible}>
            <ContainerStyled active={visible} onClick={(e)=> e.stopPropagation()}>
                <ModalHeaderStyled>{title}</ModalHeaderStyled>
                <CloseStyled src={close} alt='close' onClick={setVisible}/>
                <ContentStyled>
                    {children}
                </ContentStyled>
            </ContainerStyled>
        </ModalStyled>
    );
};

export default Modal;
