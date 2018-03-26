import axios from "axios";
import React from 'react';

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
    if (this.state.error) {
      return (
        <span />
      );
    } else if (!this.state.loaded) {
      return (
        <span />
      );
    }
    return (
      <img
        className={this.props.className}
        style={this.props.style}
        src={this.state.data}
        alt={this.props.alt}
        height = {this.props.height}
        width = {this.props.width}
      />
    );
  }
}
