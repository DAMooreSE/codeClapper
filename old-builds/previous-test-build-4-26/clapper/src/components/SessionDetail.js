import React, { Component } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import _ from "lodash";
import store from "../stores/AppStore";
import selectSession from "../orchestrations/selectSession";
import FabButton from "./FabButton";
import addClipToSession from "../orchestrations/addClipToSession";
import stopRecording from "../orchestrations/requests/stopRecording";
import restartSrc from "./images/restart.png";
// import endSession from '../orchestrations/endSession';
import clapperSrc from "./images/clapper.png";
import addSrc from "./images/add.png";
import stopSrc from "./images/stop.png";
// import saveSrc from "./images/icons8-save-96.png";
import downloadSrc from "./images/download.png";
import CardLink from "./CardLink";
import firebase from "firebase/app";
import { exportStates } from "../stores/constants";
import { getSessionDownloadUrl } from "../services/api";

// import cancelSrc from './images/cancel.png';
// import type { Session } from '../stores/AppStore';

// $FlowFixMe
@observer
class SessionDetail extends Component {
  async componentWillMount() {
    const {
      match: {
        params: { sessionId },
      },
    } = this.props;

    if (sessionId) {
      selectSession(sessionId);
    }
  }

  handleAddClipClick = () => {
    const { history } = this.props;
    addClipToSession(history);
  };

  handleStopClick = () => {
    const { history } = this.props;
    stopRecording(history);
  };

  handleReExport = () => {
    const { history } = this.props;
    const {
      match: {
        params: { sessionId },
      },
    } = this.props;
    history.push(`/sessions/${sessionId}/exporting`);
  }

  // handleExportClick = () => {
  //   const { history } = this.props;
  //   const { selectedSession } = store;
  //   history.push(`/sessions/${selectedSession.id}/exporting`);
  // };

  handleDownloadClick = async () => {
    const { selectedSession } = store;
    const downloadUrl = await getSessionDownloadUrl(selectedSession.url);

    window.location.href = downloadUrl;
  };

  handleEndClick = () => {
    // endSession(history);
    console.log(
      "need to show warning here that guides you to stopping on the recording device"
    );
  };

  render() {
    const { selectedSession } = store;

    if (!selectedSession) {
      return null;
    }

    console.log("Log: selected session ", toJS(selectedSession));

    let listing;

    if (!selectedSession.clips || !_.keys(selectedSession.clips).length) {
      listing = (
        <div className="card-body">
          <h3>No clips for this session.</h3>
        </div>
      );
    } else {
      listing = _(selectedSession.clips)
        .entries()
        .orderBy(([, v]) => v.startDate)
        .map(([clipId, c], i) => {
          console.log('Log: mapping ', {
            clipId,
            c,
            i
          })
          return (
            <CardLink
              to={`/sessions/${selectedSession.id}/clips/${clipId}`}
              key={c.id}
              className="row m-0 border-bottom p-2 pt-3 pb-3 p-md-20 justify-content-between"
            >
              <div className="col-2 p-1 pl-2  align-self-center">
                <h3 className="text-dark">#{i + 1}</h3>
              </div>

            <div className="col-4">
              <div className="text-muted">Video Duration</div>
              <div className="font-weight-bold text-dark">
                {c.videoDuration}
              </div>
            </div>

            <div className="col-4">
              <div className="text-muted">Audio Duration</div>
              <div className="font-weight-bold text-dark">
                {c.audioDuration}
              </div>
            </div>
          </CardLink>
        );
      }).value();
    }

    return (
      <div className="mb-5 below-card-2">
        <div className="card mb-2 p-0">{listing}</div>
        {!selectedSession.endDate && (
          <FabButton
            main={{
              image: clapperSrc,
              hoverImage: addSrc,
              extraClass: "btn-primary",
              tooltip: "Add Clip",
              clickHandler: this.handleAddClipClick,
            }}
            buttons={[
              {
                tooltip: "Stop recording",
                extraClass: "btn-warning",
                image: stopSrc,
                clickHandler: this.handleStopClick,
              },
            ]}
          />
        )}
        {selectedSession.endDate &&
          selectedSession.exportStatus === exportStates.SUCCESS && (
            <FabButton
              main={{
                image: clapperSrc,
                hoverImage: downloadSrc,
                extraClass: "btn-primary",
                tooltip: "Download",
                clickHandler: this.handleDownloadClick,
              }}
              buttons={[
                {
                  tooltip: "Re export",
                  extraClass: "btn-warning",
                  image: restartSrc,
                  clickHandler: this.handleReExport,
                },
              ]}
            />
          )}
      </div>
    );
  }
}

export default SessionDetail;
