import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import store from "../stores/AppStore";
import selectSession from "../orchestrations/selectSession";
import startExporting from "../orchestrations/requests/startExporting";
import { exportStates } from "../stores/constants";
// import getDurationStr from "../utils/getDurationStr";
// import cameraIconSrc from "./images/video-camera-64@2x.png";
// import audioIconSrc from "./images/speaker-64@2x.png";
// import addAudioToClip from "../orchestrations/addAudioToClip";
// import endClip from "../orchestrations/endClip";
// import abortClip from "../orchestrations/abortClip";

// import FabButton from "./FabButton";
// import clapperSrc from "./images/clapper.png";
// import addSrc from "./images/add.png";
// import stopSrc from "./images/stop.png";
// import cancelSrc from "./images/cancel.png";
// import { toJS } from "mobx";

// const Icon = styled.div`
//   background-size: 32px 28px;
//   background-repeat: no-repeat;
//   display: block;
//   width: 32px;
//   height: 28px;
// `;

// const CameraIcon = styled(Icon)`
//   background-image: url(${cameraIconSrc});
// `;

// const AudioIcon = styled(Icon)`
//   background-image: url(${audioIconSrc});
// `;

const Exporting = observer((props) => {
  const { selectedSession } = store;

  const {
    match: {
      params: { sessionId },
    },
    history,
  } = props;

  const [startedExport, setStartedExport] = useState(false);

  function startExport() {
    setStartedExport(true);
    console.log(
      "frikkie: starting export because ",
      selectedSession.exportStatus
    );
    startExporting();
  }

  useEffect(() => {
    if (!sessionId) {
      history.replace("/");
      return;
    }

    selectSession(sessionId);
  }, [sessionId, history]);

  useEffect(() => {
    if (!selectedSession) {
      return;
    }

    console.log(
      "frikkie: in useEffect handling the selectedSession change ",
      toJS(selectedSession)
    );

    if (selectedSession.exportStatus === exportStates.IDLE && !startedExport) {
      startExport();
    }
  }, [selectedSession, history, startedExport]);

  if (!selectedSession) {
    return null;
  }

  return (
    <div>
      <div>Exporting status: {selectedSession.exportStatus}</div>
      {(selectedSession.exportStatus === exportStates.ERRORED ||
        selectedSession.exportStatus === exportStates.SUCCESS) && (
        <button
          type="button"
          className="btn btn-lg btn-primary btn-block px-5 mt-5"
          onClick={startExport}
        >
          Retry Export
        </button>
      )}
    </div>
  );
});

export default Exporting;
