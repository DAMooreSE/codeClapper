import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

import { observer } from "mobx-react";
import store from "../stores/AppStore";

import syncDevices from "../orchestrations/requests/syncDevices";
import startRecording from "../orchestrations/requests/startRecording";
import { recordingStates } from "../stores/constants";

const StyledSelect = styled.select`
  min-width: 200px;
  padding: 10px;
`;

@observer
class StartRecording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    syncDevices();
  }

  onRecordClick = async () => {
    if (!this.screenSelect || !this.audioSelect) {
      return;
    }
    startRecording({
      screen: this.screenSelect.value,
      mic: this.audioSelect.value,
      history: this.props.history,
    });
  };

  onRecordAgainClick = () => {
    // appStore().setRecordingState("IDLE");
  };

  render() {
    const { devices, isFetchingDevices, recordingState } = store;

    if (isFetchingDevices || recordingState === recordingStates.STARTING) {
      return <Spinner />;
    }

    const screenOptions = devices.screens.map((screen) => (
      <option
        value={screen.id}
        key={screen.id}
        selected={screen.name.includes("DELL")}
      >
        {screen.name}
      </option>
    ));

    const audioOptions = devices.mics.map((mic) => (
      <option value={mic.id} key={mic.id} selected={mic.name.includes("Yeti")}>
        {mic.name}
      </option>
    ));

    return (
      <div className="pt-5">
        <div className="d-flex justify-content-center align-items-center">
          <form style={{ width: "500px" }}>
            <div className="form-group d-flex justify-content-between border-bottom mb-3 pb-1">
              <div>
                <p className="font-weight-bold h4">Record video</p>
                <p className="text-muted h5">Select screen to record</p>
              </div>
              <div className="pt-2">
                <StyledSelect
                  id="screen"
                  ref={(select) => (this.screenSelect = select)}
                >
                  {screenOptions}
                </StyledSelect>
              </div>
            </div>
            <div className="form-group d-flex justify-content-between border-bottom mb-3 pb-1">
              <div>
                <p className="font-weight-bold h4">Record audio</p>
                <p className="text-muted h5">Select audio to record</p>
              </div>
              <div className="pt-2">
                <StyledSelect
                  id="screen"
                  ref={(select) => (this.audioSelect = select)}
                >
                  {audioOptions}
                </StyledSelect>
              </div>
            </div>

            {(recordingState === recordingStates.IDLE || !recordingState) && (
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block px-5 mt-5"
                onClick={this.onRecordClick}
              >
                Start Recording
              </button>
            )}

            {recordingState === recordingStates.STARTING && [
              <div className="h4" key="heading">
                Starting recording session
              </div>,
            ]}

            {recordingState === recordingStates.ERRORED && (
              <div>
                <div className="alert alert-danger">
                  Could not start recording
                </div>
                <button
                  type="button"
                  className="btn btn-lg btn-primary btn-block px-5 mt-5"
                  onClick={this.onRecordClick}
                >
                  Try again
                </button>
              </div>
            )}

            {recordingState === recordingStates.ACTIVE && (
              <div>
                <div className="alert alert-success">Busy recording!</div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default StartRecording;
