import React, {useState} from 'react';
import Easel from './Easel';
import Palete from './Palete';
import Layers from './Layers';
import Ie from './Ie';

export default function Desktop(props) {
    let [width, setWidth] = useState(50);
    let [height, setHeight] = useState(50);
    let [grid, setGrid] = useState(false);
    let [zoom, setZoom] = useState(100);
    let [color, setColor] = useState('#000');
    let [curLayer, setCurLayer] = useState('default');

    let layers = [
        'default',
        'bg',
        'new'
    ];

    function onWheel(e) {
        e.preventDefault();
        e.stopPropagation()
        if(e.deltaY > 0) setZoom(zoom+20);
        else setZoom(zoom-20 < 100 ? 100 : zoom-20);
    }

    return (
        <div>

            <Ie k='set'>
                Width:
                <input type="number" name="width" value={width} onChange={e => setWidth(e.target.value)}/><br/>
                Height:
                <input type="number" name="height" value={height}  onChange={e => setHeight(e.target.value)}/><br/>
                <br/>
                Zoom:
                <input type="number" name="zoom" value={zoom}  onChange={e => setZoom(e.target.value)}/><br/>
                Grid:
                <input type="checkbox" name="grid" onChange={e => setGrid(e.target.checked)}/><br/>
            </Ie>

            <Ie k='pal'>
                <Palete
                    setColor={color => setColor(color)}
                />
            </Ie>
            <Ie k='lay'>
                <Layers
                    layers={layers}
                    curLayer={curLayer}
                    setLayer={setCurLayer}
                />
            </Ie>

            <Easel
                layers={layers}
                curLayer={curLayer}
                width={width}
                height={height}
                isGrid={grid}
                color={color}
                zoom={zoom}
                onWheel={onWheel}
            />
        </div>
    );
}

function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}