import React, {useState} from 'react';
import styled from 'styled-components';

let Root = styled.div`
    position: relative;
    border: 1px solid #000;
    font-size: 0;
`;

let Color = styled.div`
    background: ${props => props.color};
    width: 50px;
    height: 50px;
    margin: 10px;
    display: inline-block;
`;

export default function Palete({setColor}) {
    return (
        <Root>
            <Color
                color="#000"
                onClick={e => setColor(e.target.getAttribute('color'))}
            />
            <Color
                color="#f00"
                onClick={e => setColor(e.target.getAttribute('color'))}
            />
            <Color
                color="#0f0"
                onClick={e => setColor(e.target.getAttribute('color'))}
            />
            <Color
                color="#00f"
                onClick={e => setColor(e.target.getAttribute('color'))}
            />
        </Root>
    );
}