import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import store from "../stores/AppStore";
import selectSession from "../orchestrations/selectSession";
import startExporting from "../orchestrations/requests/startExporting";
import { exportStates } from "../stores/constants";

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
      "starting export because ",
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
      "in useEffect handling the selectedSession change ",
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
