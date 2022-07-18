import React, { Component } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import classnames from "classnames";
import "./FabButton.css";
import store from "../stores/AppStore";

const BackgroundEnabledSpan = styled.span`
  background-image: url(${(props) => props.hoverImage});
`;

let block;

function clickHelper(clickHandler) {
  return function handler(evt) {
    if (block) {
      return;
    }

    block = true;

    evt.persist();
    const target = evt.currentTarget;
    console.log("click handler - ", evt);
    setTimeout(() => {
      target.classList.remove("mousedown");
      clickHandler(evt);
      setTimeout(() => {
        block = false;
      }, 500);
    }, 250);
  };
}

const MainFab = (props) => (
  <div
    className={`fab-buttons fab-button-main fab-button-primary btn-primary`}
    tooltip={props.tooltip}
    onClick={clickHelper(props.onClick)}
  >
    <span>
      <BackgroundEnabledSpan
        className="rotate"
        open={true}
        hoverImage={props.hoverImage}
        image={props.image}
      />
    </span>
  </div>
);

const SecondaryFab = ({ config }) => (
  <div
    className={`fab-buttons ${config.extraClass}`}
    tooltip={config.tooltip}
    style={{
      backgroundImage: `url(${config.image})`,
    }}
    onClick={clickHelper(config.clickHandler)}
  />
);

@observer
class FabButton extends Component {

  state = {
    open: true,
  };

  componentWillMount() {
    store.setFabOpenState(true);
  }

  mainClick = (evt) => {
    const { fabOpen } = store;
    const {
      main: { clickHandler },
    } = this.props;

    evt.stopPropagation();
    if (!fabOpen) {
      store.setFabOpenState(true);
      return;
    }

    clickHandler();
  };

  render() {
    const { main, buttons } = this.props;
    const { fabOpen } = store;

    const buttonEls = buttons.map((b) => (
      <SecondaryFab config={b} key={b.tooltip} />
    ));

    return (
      <div className="fixed-bottom container pb-4 d-flex justify-content-end">
        <nav
          className={classnames("menu-container", {
            "menu-container-open": fabOpen,
          })}
        >
          {buttonEls}

          <MainFab
            {...main}
            open={fabOpen}
            onClick={this.mainClick}
            key={main.tooltip}
          />
        </nav>
      </div>
    );
  }
}

export default FabButton;
