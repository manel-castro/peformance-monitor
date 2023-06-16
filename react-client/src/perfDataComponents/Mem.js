import { useRef } from "react";
import drawCircle from "../utilities/canvasLoadAnimation";

const Mem = ({ data }) => {
  const { freeMem, totalMem, usedMem, memUsage } = data;

  const totalMemInGB = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMem / 1073741824) * 100) / 100;

  const canvasEl = useRef();

  drawCircle(canvasEl.current, usedMem * 100);

  return (
    <div className="cpu col-3">
      <h3>Memory usage</h3>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasEl}
          className="canvas"
          width="200"
          height="200"
        ></canvas>
        <div className="cpu-text">{memUsage}</div>
      </div>
      <div>Total Memory:{totalMemInGB}</div>
      <div>Free Memory:{freeMemInGB}</div>
    </div>
  );
};
export default Mem;
