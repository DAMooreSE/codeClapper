import React, { Component } from "react";

class InfoCard extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="card">
        <div className="card-body">{children}</div>
      </div>
    );
  }
}

export default InfoCard;
