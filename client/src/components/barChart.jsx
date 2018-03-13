import React, { Component } from "react";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.graph = {};
  
  }
  componentDidMount() {
    const { config, height, width } = this.getConfig();
    this.graph = {
      width,
      height,
      config
    };

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
    const { config } = this.graph;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, config.barWidth, height);
  }
  drawAxisLabel(value, index, y, width) {
    const ctx = this.context;
    const { config } = this.graph;
    ctx.font = "14px Roboto";
    ctx.fillStyle = "gray";
    ctx.fillText(
      value,
      (1 + index) * (config.margin + width) - width / 2,
      y,
      width
    );
  }
  drawValueLabel(value, index, y, width) {
    const ctx = this.context;
    const { config } = this.graph;
    ctx.font = "12px Roboto";
    ctx.fillText(
      value,
      (1 + index) * (config.margin + width) - 10 - width / 3,
      y - 15,
      width
    );
  }
  drawGraph() {
    const ctx = this.context;
    const { config, height, width } = this.graph;

    const { labels } = this.props;

    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = "center";

    // draw axis labels
    labels.map((elem, index) => {
      this.drawAxisLabel(elem, index, height - 1, config.barWidth);
      return elem;
    });

    // draw X axis
    this.drawLine(
      config.margin,
      height - 15,
      width - config.margin,
      height - 15,
      0.2
    );
  }

  drawData(data) {
    const { config, height } = this.graph;
    const w = config.barWidth;
    data.map((elem, index) => {
      const h = elem * w / 4 + w / 6; // height of bar - we want 0 to have a some height
      this.drawRectangle(
        index * (config.margin + w) + config.margin,
        height - h - 15,
        h,
        config.colors[index]
      );

      // draw value label
      this.drawValueLabel(elem, index, height - h - 10, w);
      return elem;
    });
  }
  updateCanvas() {
    const { data } = this.props;
    const { width, height } = this.graph;
    const canvas = this.refs.canvas;

    canvas.width = width;
    canvas.height = height;

    if (data && data.length > 0) {
      // allocate enought space for all bars
      this.drawGraph();
      this.drawData(data);
    }
  }
  getConfig() {
    const { unitHeight } = this.props;
    const parentWidth = this.refs.node.parentNode.clientWidth;
    const baseWidth = parentWidth / 13; // allow for 7 bars and 10 margins

    return {
      config: {
        barWidth: baseWidth,
        margin: baseWidth * 0.6,
        colors: [
          "#37474f",
          "#ab47bc",
          "#ffc400",
          "#2196f3",
          "#795548",
          "#ff6e40",
          "#00e676"
        ]
      },
      height:  (4 + unitHeight) * baseWidth/3 * 1.4,
      width: parentWidth - baseWidth * 1.2
    };
  }
  render() {
    return (
      <div ref="node">
        <canvas ref="canvas" width={500} height={20} />
      </div>
    );
  }
}


export default BarChart;
