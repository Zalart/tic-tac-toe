import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import x from '../assets/images/cross.svg';
import o from '../assets/images/o.svg';

const CellStyled = styled.div`
  font-size: 6em;
  cursor: pointer;
  background-color: ${({isSelected}) => isSelected ? 'palevioletred' : 'lightgrey'};
  display: flex;
  width: ${({size}) => css`calc(100% * (1/${size}) - ${size*0.1}rem)`};
  height: ${({size}) => css`calc(100% * (1/${size}) - ${size*0.1}rem)`};
  opacity: ${({winner, content, isHovering}) => (!winner && !content && isHovering) ? 0.5 : 1};
  &:hover {
    background-color: lightsteelblue;
  };
  &:nth-child(1) {
    border-radius: 15% 0 0 0;
  };
  &:nth-child(${({size}) => size}) {
    border-radius: 0 15% 0 0;
  };
  &:nth-child(${({size}) => size * size - size + 1}) {
    border-radius: 0 0 0 15%;
  };
  &:nth-child(${({size}) => size * size}) {
    border-radius: 0 0 15% 0;
  };
`;

const ImgStyled = styled.img`
  margin: auto;
  width: 60%;
`
const Cell = ({rowIdx, cellIdx, content, cellClickHandler, size, isSelected, currentPlayer, winner}) => {
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseOver() {
        setIsHovering(true);
    }
    function handleMouseOut() {
        setIsHovering(false);
    }
    function onCellClick() {
        setIsHovering(false);
        cellClickHandler(rowIdx, cellIdx);
    }

    return (
        <CellStyled
            size={size}
            winner={winner}
            content={content}
            isHovering={isHovering}
            isSelected={isSelected}
            onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={onCellClick}>
            {content && <ImgStyled src={content === 'O' ? o : x } />}
            {!winner && isHovering && content === '' && <ImgStyled src={currentPlayer === 'O' ? o : x } /> }
        </CellStyled>
    );
};

export default Cell;
