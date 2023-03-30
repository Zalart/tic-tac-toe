import React from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

const SLIDER_DEFAULTS = [2,3,4,5,6,7,8,9]

const Slider = ({size, changeValueHandler}) => {
    return (
        <ReactSlider className="customSlider"
                     trackClassName="customSlider-track"
                     thumbClassName="customSlider-thumb"
                     markClassName="customSlider-mark"
                     defaultValue={3}
                     value={size}
                     onChange={ (value)=> changeValueHandler(value)}
                     marks={SLIDER_DEFAULTS}
                     min={2}
                     max={9}
                     renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
/>
    );
};

export default Slider;
