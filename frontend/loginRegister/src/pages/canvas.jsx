import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Arrow, Line, Transformer } from 'react-konva';
import { LuPencil } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { GiArrowCursor } from "react-icons/gi";
import { IoMdDownload } from "react-icons/io";
import { TbRectangle } from "react-icons/tb";

import { v4 as uuidv4 } from 'uuid';
import { ACTIONS } from '../pages/constants';
import html2canvas from 'html2canvas'; 
import '../styles/Drawingboard.css'; 

function DrawingBoard() {
  const stageRef = useRef();
  const transformerRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState('#ff0000');
  const [shapes, setShapes] = useState([]);

  const strokeColor = '#000';
  const isPaining = useRef();
  const currentShapeId = useRef();

  const isDraggable = action === ACTIONS.SELECT;

  function handlePointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    let newShape;
    switch (action) {
      case ACTIONS.RECTANGLE:
        newShape = {
          id,
          type: 'rect',
          x,
          y,
          width: 20,
          height: 20,
          fillColor,
        };
        break;
      case ACTIONS.CIRCLE:
        newShape = {
          id,
          type: 'circle',
          x,
          y,
          radius: 20,
          fillColor,
        };
        break;
      case ACTIONS.ARROW:
        newShape = {
          id,
          type: 'arrow',
          points: [x, y, x + 20, y + 20],
          fillColor,
        };
        break;
      case ACTIONS.SCRIBBLE:
        newShape = {
          id,
          type: 'scribble',
          points: [x, y],
          fillColor,
        };
        break;
      default:
        break;
    }

    setShapes([...shapes, newShape]);
  }

  function handlePointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    let updatedShapes = shapes.map((shape) => {
      if (shape.id === currentShapeId.current) {
        switch (shape.type) {
          case 'rect':
            return { ...shape, width: x - shape.x, height: y - shape.y };
          case 'circle':
            return { ...shape, radius: Math.sqrt((y - shape.y) ** 2 + (x - shape.x) ** 2) };
          case 'arrow':
            return { ...shape, points: [shape.points[0], shape.points[1], x, y] };
          case 'scribble':
            return { ...shape, points: [...shape.points, x, y] };
          default:
            return shape;
        }
      }
      return shape;
    });

    setShapes(updatedShapes);
  }

  function handlePointerUp() {
    isPaining.current = false;
  }

  function handleExport() {
    html2canvas(stageRef.current.getStage().content).then((canvas) => {
      const uri = canvas.toDataURL();
      var link = document.createElement('a');
      link.download = 'image.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function handleClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  return (
    <div className="drawing-board">
      {/* Controls */}
      <div className="controls">
        <div className="tool-buttons">
          <button
            className={action === ACTIONS.SELECT ? 'active' : ''}
            onClick={() => setAction(ACTIONS.SELECT)}
          >
            <GiArrowCursor size={'2rem'} />
          </button>
          <button
            className={action === ACTIONS.RECTANGLE ? 'active' : ''}
            onClick={() => setAction(ACTIONS.RECTANGLE)}
          >
            <TbRectangle size={'2rem'} />
          </button>
          <button
            className={action === ACTIONS.CIRCLE ? 'active' : ''}
            onClick={() => setAction(ACTIONS.CIRCLE)}
          >
            <FaRegCircle size={'1.5rem'} />
          </button>
          <button
            className={action === ACTIONS.ARROW ? 'active' : ''}
            onClick={() => setAction(ACTIONS.ARROW)}
          >
            <FaLongArrowAltRight size={'2rem'} />
          </button>
          <button
            className={action === ACTIONS.SCRIBBLE ? 'active' : ''}
            onClick={() => setAction(ACTIONS.SCRIBBLE)}
          >
            <LuPencil size={'1.5rem'} />
          </button>
        </div>
        <div className="color-picker">
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </div>
        <div className="export-button">
          <button onClick={handleExport}>
            <IoMdDownload size={'1.5rem'} />
          </button>
        </div>
      </div>
      {/* Canvas */}
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill="#ffffff"
            id="bg"
            onClick={() => {
              transformerRef.current.nodes([]);
            }}
          />

          {shapes.map((shape) => {
            switch (shape.type) {
              case 'rect':
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={shape.fillColor}
                    height={shape.height}
                    width={shape.width}
                    draggable={isDraggable}
                    onClick={handleClick}
                  />
                );
              case 'circle':
                return (
                  <Circle
                    key={shape.id}
                    radius={shape.radius}
                    x={shape.x}
                    y={shape.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={shape.fillColor}
                    draggable={isDraggable}
                    onClick={handleClick}
                  />
                );
              case 'arrow':
                return (
                  <Arrow
                    key={shape.id}
                    points={shape.points}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={shape.fillColor}
                    draggable={isDraggable}
                    onClick={handleClick}
                  />
                );
              case 'scribble':
                return (
                  <Line
                    key={shape.id}
                    lineCap="round"
                    lineJoin="round"
                    points={shape.points}
                    stroke={strokeColor}
                    strokeWidth={2}
                    fill={shape.fillColor}
                    draggable={isDraggable}
                    onClick={handleClick}
                  />
                );
              default:
                return null;
            }
          })}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}

export default DrawingBoard;
