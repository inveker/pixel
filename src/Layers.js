import React, {useState} from 'react';
import styled from 'styled-components';

let Root = styled.div`
    position: relative;
    display: inline-block;
    border: 1px solid #000;
    font-size: 0;
`;
let Layer = styled.div`
    border: 1px solid #000;
    font-size: 20px;
    margin: 5px;
    height: 50px;
    width: 200px;
`;

export default ({layers, curLayer, setLayer}) => {
    return (
        <Root>
            {layers.map(layer =>
                <Layer
                    onClick={() => setLayer(layer)}

                >
                    {layer}
                    {(layer == curLayer ) && ': Current'}
                </Layer>
            )}
        </Root>
    );
}
