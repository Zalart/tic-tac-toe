import React from 'react';
import restart  from '../assets/images/restart_button.svg';



const ResetButton = ({restartHandler}) => {
    return (
        <div>
            <img src={restart} width={'60px'} onClick={restartHandler} alt="reset" />
        </div>
    );
};

export default ResetButton;
