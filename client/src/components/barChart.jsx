import React, { Component } from "react";

class BarChart extends Component {

  componentDidMount() {
    this.context = this.refs.canvas.getContext("2d");
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.context = this.refs.canvas.getContext("2d");
    this.updateCanvas();
  }
  drawLine(fromX, fromY, toX, toY, width) {
    const ctx = this.context;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
  drawRectangle(x, y, height, color) {
    const ctx = this.context;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.props.config.barWidth, height);
  }
  drawAxisLabel(value, index, y, width) {
    const ctx = this.context;
    const { config } = this.props;
    ctx.font="14px Roboto";
    ctx.fillStyle = 'gray';
    
    ctx.fillText(
      value,
      (1 + index) * (config.margin + width) - width /2,
      y,
      width
    );
  }
  drawValueLabel(value, index, y, width) {
    const ctx = this.context;
    const { config } = this.props;
    ctx.font="12px Roboto";
    ctx.fillText(
      value,
      (1+ index) * (config.margin + width) - 10 - width/3,
      y -15,
      width
    );
  }
  drawGraph(width, height) {
    const ctx = this.context;
    const { config, labels } = this.props;

    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = "center";

    // draw axis labels
    labels.map((elem, index) => {
      this.drawAxisLabel(elem, index, height, config.barWidth);
      return elem;
    });

    // draw X axis
    this.drawLine(0, height - 15, width, height - 15, 0.2);
  }
  drawData(data) {
    const { config } = this.props;
    const w = config.barWidth;
    const ctx = this.context;

    ctx.restore();
   //ctx.translate(config.margin, -15); // move to first rectangle position

    data.map((elem, index) => {
      const h = elem * w/2 + w /4; // height of bar - we want 0 to have a some height
      this.drawRectangle(
        index * (config.margin + w) + config.margin,
        config.height - h - 15,
        h,
        config.colors[index]
      );
     
      // draw value label
      this.drawValueLabel(elem, index, config.height - h - 10, w);
      return elem;
    });
    
  }
  updateCanvas() {
    const { data, config } = this.props;
    if (data && data.length > 0) {
      // allocate enought space for all bars
      this.drawGraph(config.width, config.height);
      this.drawData(data);
     
    }
  }

  render() {
    const { config } = this.props;
    return (
      <div className="container">
        <canvas ref="canvas" width={config.width} height={config.height} />
      </div>
    );
  }
}

export default BarChart;
