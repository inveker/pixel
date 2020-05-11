import React, {useState} from 'react';

export default (props) => {
    let [i, setI] = useState(false);
    let [start, setStart] = useState({x:0, y:0});
    let storagePos = localStorage[props.k] ? JSON.parse(localStorage[props.k]) : {x: 0, y: 0};
    let [top, setTop] = useState(storagePos.y);
    let [left, setLeft] = useState(storagePos.x);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 100,
                left: left,
                top: top,
                background: '#fff'
            }}
            onMouseDown={e => {
                setI(true);
                setStart({x:e.clientX, y:e.clientY});
            }}
            onMouseMove={e => {
                if(i) {
                    let pos = e.target.getBoundingClientRect();
                    let x = left + (e.clientX - start.x);
                    let y = top + (e.clientY - start.y);
                    setTop(y);
                    setLeft(x);
                    localStorage[props.k] = JSON.stringify({x: x, y: y});
                    console.log(localStorage[props.k])

                    setStart({x:e.clientX, y:e.clientY});
                }
            }}
            onMouseUp={() => {
                setI(false)
            }}
            onMouseLeave={() => {
                setI(false)
            }}
        >
            {props.children}
        </div>
    );
}