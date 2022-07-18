import React, { useState } from "react";
import { observer } from "mobx-react";
import login from "../orchestrations/login";
import store from "../stores/AppStore";
import styled from "styled-components";

const StyledCard = styled.div`
  max-width: 500px;
`;

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticating, authenticationError } = store;

  const handleForm = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <StyledCard className="container">
      <h1>Log in</h1>

      {isAuthenticating && <p>checking your credentials</p>}

      {!isAuthenticating && (
        <div className="card p-5">
          {!isAuthenticating && authenticationError && (
            <p className="text-danger text-center">Could not log you in</p>
          )}
          <form onSubmit={(e) => handleForm(e)}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {" "}
                Login{" "}
              </button>
            </div>
          </form>
        </div>
      )}
    </StyledCard>
  );
});

export default Login;
