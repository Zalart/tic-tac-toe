import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import restart  from '../assets/images/restart_button.svg';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}`;

const ImgButtonStyled = styled.img`
  cursor: pointer;
  width: 60px;
  opacity: ${props=>props.pushed && .5};
  animation: ${props=>props.pushed && rotate} .3s ease-in-out;
`

const ResetButton = ({restartHandler}) => {
    const [pushed, setPushed] = useState(false);
    const buttonClickHandler = () => {
        setPushed(true);
        restartHandler();
    }
    return (
        <div>
            <ImgButtonStyled src={restart} onClick={buttonClickHandler} pushed={pushed} alt="reset" onAnimationEnd={()=> setPushed(false)} />
        </div>
    );
};

export default ResetButton;
