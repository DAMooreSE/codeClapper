import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import "./Header.css";

import store from "../stores/AppStore";

const Header = observer(() => {
  const { checkingAuth, profile } = store;

  let profileLink = null;

  if (!checkingAuth && !profile) {
    profileLink = <li className="nav-item ml-4">Sign in</li>;
  }

  if (profile) {
    profileLink = (
      <li className="nav-item ml-4 d-flex">
        <div className="ml-2 font-weight-bold pt-1">{profile.email}</div>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="logo" to="/" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
          aria-controls="navbarToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="navbar-collapse collapse justify-content-end"
          id="navbarToggle"
        >
          <div>
            <ul className="navbar-nav mr-auto">{profileLink}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Header;
