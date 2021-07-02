import { Component, createRef } from "react";
import classes from "./Waveform.module.scss";

/**
 * @param peaks: Array[Number]
 * @param bgColor hex color
 * @param waveColor hex color
 * @param process Number (0 -> 100%)
 * @param clicked Event
 */
class Waveform extends Component {

  canvasRef = createRef();
  ctx = null;

  componentDidMount () {    
    this.initCanvas();
    this.drawWave(this.props.peaks, 0);
  }

  componentDidUpdate () {
    this.drawWave(this.props.peaks, this.props.process / 100);
  }

  initCanvas = () => {
    const canvas = this.canvasRef.current;
    const pixelRate = window.devicePixelRatio || 1;

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth * pixelRate;
    canvas.height = canvas.offsetHeight * pixelRate;

    this.ctx = canvas.getContext("2d");
    this.ctx.translate(0, canvas.height / 2);
  }

  resetCanvas = () => {
    const canvas = this.canvasRef.current;
    this.ctx.clearRect(0, 0, canvas.style.width, canvas.style.height);

    this.initCanvas();
  }

  drawLine = (x1, y1, x2, y2, lineWidth, color) => {
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();

    this.ctx.moveTo(x1, -y1);
    this.ctx.lineTo(x2, -y2);
    this.ctx.stroke();
    
    this.ctx.closePath();
  }

  drawWave = (peaks, process) => {
    this.resetCanvas();

    const canvas = this.canvasRef.current;
    const ratio = canvas.width / peaks.length;

    const visiblePeaks = peaks.reduce((result, peak, index) => {
      const position = Math.floor(index * ratio);
      
      if (result[position] === undefined)
        result[position] = peak * canvas.height / 2;
      else 
        result[position] = Math.abs(result[position]) > Math.abs(peak) ? result[position] : peak;

      return result;
    }, []);

    const processPosition = process * visiblePeaks.length;

    visiblePeaks.reduce((previousPeak, currentPeak, index) => {
      this.drawLine(
        index-1, 
        previousPeak, 
        index, 
        currentPeak, 
        1, 
        (processPosition >= index) ? this.props.waveColor : this.props.bgColor
      );

      return currentPeak;
    });
  } 

  handleClickCanvas = (event) => {
    const canvas = this.canvasRef.current;
    const mousePositionX = event.clientX - canvas.offsetLeft;
    const newProcess = mousePositionX / canvas.offsetWidth;

    this.props.clicked(newProcess);
  }

  render () {
    return <div className="d-flex justify-content-center align-items-center w-100">
      <canvas className={ classes.Waveform } ref={ this.canvasRef } onClick={ this.handleClickCanvas } />
    </div>
  }
}

export default Waveform