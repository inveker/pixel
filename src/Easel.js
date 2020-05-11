import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Root = styled.div`
    margin: 50px 0;
    position: relative;
`;

const Canvas = styled.canvas`
    border: 1px solid black;
    position: absolute;
    image-rendering: pixelated;
    width: 100%;
    height: 100%;
`;

export default ({width, height, isGrid, layers, curLayer, zoom, color, onWheel}) => {

    zoom = zoom/100;
    //Refs
    let canvases = [];
    let grid;
    let cursor;

    //trash
    let pixel = 10;
    let isDown = false;
    let pixels = {};

    //func
    function getPosition(e) {
        let pos = e.target.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX-pos.left) / (pixel*zoom)) * pixel,
            y: Math.floor((e.clientY-pos.top) / (pixel*zoom)) * pixel
        }
    }

    //Graphic
    function drawPixel(canvas, pos, color) {
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = color ? color : '#000';
        canvas.ctx.rect(pos.x, pos.y,  pixel,  pixel);
        canvas.ctx.fill()
    }

    function drawLine(a ,b) {
        let xDiff = Math.abs((b.x - a.x) / pixel)-1;
        let yDiff = Math.abs((b.y - a.y) / pixel)-1;
        let qX = b.x > a.x ? 1 : -1;
        let qY = b.y > a.y ? 1 : -1;
        if(xDiff || yDiff) {
            if(xDiff > yDiff) {
                if(yDiff < 1) {
                    yDiff = 1;
                    qY = 0;
                }
                let length = Math.floor(xDiff / yDiff)
                let tail = xDiff % yDiff
                let ll = 0;
                let blaMagic = 0;
                for(let y = 1; y <= yDiff; y++) {
                    let l = length + (tail-- > 0 ? 1 : 0);
                    blaMagic += ll * pixel * qX
                    for(let x = 1; x <= l; x++) {
                        drawPixel(canvases[curLayer], {
                            x: a.x + blaMagic + pixel * x * qX,
                            y: a.y + pixel * y * qY
                        }, color);
                    }
                    ll = l;
                }
            } else {
                if(xDiff < 1) {
                    xDiff = 1;
                    qX = 0;
                }
                let length = Math.floor(yDiff / xDiff)
                let tail = yDiff % xDiff
                let ll = 0;
                let blaMagic = 0;
                for(let x = 1; x <= xDiff; x++) {
                    let l = length + (tail-- > 0 ? 1 : 0);
                    blaMagic += ll * pixel * qY
                    for(let y = 1; y <= l; y++) {
                        drawPixel(canvases[curLayer], {
                            x: a.x + pixel * x * qX,
                            y: a.y + blaMagic + pixel * y * qY
                        }, color);
                    }
                    ll = l
                }
            }
        }
    }

    //Elistener ---
    let lastPoint;
    function onMouseDown(e) {
        let pos = getPosition(e);
        lastPoint = pos;
        drawPixel(canvases[curLayer], pos, color);
        isDown = true;
    }

    function onMouseUp() {
        isDown = false;
        lastPoint = false;
    }

    function onMouseMove(e) {
        let pos = getPosition(e);
        cursor.ctx.clearRect(0, 0, cursor.canvas.width, cursor.canvas.height);
        drawPixel(cursor, getPosition(e), color+'5');
        if(isDown) {
            drawLine(lastPoint, pos);
            lastPoint = pos;
            drawPixel(canvases[curLayer], pos, color);
        }
    }

    //Grid
    useEffect(() => {
        if(isGrid) {
            grid.ctx.lineWidth = 1;
            let w = grid.canvas.width * pixel * zoom;
            let h = grid.canvas.height * pixel * zoom;
            grid.ctx.strokeStyle = 'blue';
            for(let i = pixel * zoom; i < w; i+=pixel * zoom) {
                grid.ctx.beginPath();
                grid.ctx.moveTo(i, 0);
                grid.ctx.lineTo(i, h);
                grid.ctx.stroke()
            }
            for(let i = pixel * zoom; i < h; i+=pixel * zoom) {
                grid.ctx.beginPath();
                grid.ctx.moveTo(0, i);
                grid.ctx.lineTo(w, i);
                grid.ctx.stroke()
            }
        } else grid.ctx.clearRect(0, 0, grid.canvas.width, grid.canvas.height);
    }, [isGrid, zoom]);

    function setCanvas(canvas) {
        return {
            canvas: canvas,
            ctx: canvas.getContext('2d')
        }
    }



    return (
        <Root
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onWheel={onWheel}
            style={{
                width: width*pixel*zoom,
                height: height*pixel*zoom,
            }}
        >
            {layers.map(layer =>
                <Canvas
                    ref={canvas => {if(canvas) canvases[layer] = setCanvas(canvas)}}
                    className={layer == curLayer ? 'current' : ''}
                    width={width*pixel}
                    height={height*pixel}
                />
            )}
            <Canvas
                ref={canvas => { if(canvas) grid = setCanvas(canvas)}}
                width={width*pixel*zoom}
                height={height*pixel*zoom}
            />
            <Canvas
                ref={canvas => { if(canvas) cursor = setCanvas(canvas)}}
                width={width*pixel}
                height={height*pixel}
            />
        </Root>
    );
}
