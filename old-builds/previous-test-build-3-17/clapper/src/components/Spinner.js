import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
  align-items: center;
  border-radius: 8px;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: "absolute";
  right: 0;
  top: 0;
  transition: background-color 0.25s;
  height: 100vh;
`;

export default function Spinner() {
  return (
    <StyledSpinner>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </StyledSpinner>
  );
}
