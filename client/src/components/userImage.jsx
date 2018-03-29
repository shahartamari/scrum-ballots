//-----------------------------------------------------------------------------------------------------
// lazy-load image from server call to Azure graph
//-----------------------------------------------------------------------------------------------------

import axios from "axios";
import React from "react";

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      data: null
    };
  }
  getPhoto(src) {
    axios
      .get(src)
      .then(response => {
        this.setState({ data: response.data, loaded: true });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  componentDidMount() {
    this.getPhoto(this.props.src);
  }

  render() {
    const { className, style, alt, height, width, title } = this.props;
    if (this.state.error) {
      return (
        <div className={className}>
          <i className="material-icons" style={{ fontSize: 40 }}>
            error
          </i>
        </div>
      );
    } else if (!this.state.loaded) {
      return (
        <img
          className={className}
          style={style}
          src={"image/empty.png"}
          alt={alt}
          height={height}
          width={width}
        />
      );
    }
    return (
      <img
        className={className}
        style={style}
        src={this.state.data}
        alt={alt}
        height={height}
        width={width}
        title={title}
      />
    );
  }
}
