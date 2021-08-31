import React, { useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import _ from "lodash";
import store from "../stores/AppStore";
import selectClip from "../orchestrations/selectClip";
import getDurationStr from "../utils/getDurationStr";
import cameraIconSrc from "./images/video-camera-64@2x.png";
import audioIconSrc from "./images/speaker-64@2x.png";
import addAudioToClip from "../orchestrations/addAudioToClip";
import endClip from "../orchestrations/endClip";
import abortClip from "../orchestrations/abortClip";
import FabButton from "./FabButton";
import clapperSrc from "./images/clapper.png";
import addSrc from "./images/add.png";
import stopSrc from "./images/stop.png";
import cancelSrc from "./images/cancel.png";
import { toJS } from "mobx";

const Icon = styled.div`
  background-size: 32px 28px;
  background-repeat: no-repeat;
  display: block;
  width: 32px;
  height: 28px;
`;

const CameraIcon = styled(Icon)`
  background-image: url(${cameraIconSrc});
`;

const AudioIcon = styled(Icon)`
  background-image: url(${audioIconSrc});
`;

const ClipDetail = observer((props) => {
  const { selectedClip, selectedSession } = store;
  const {
    match: {
      params: { sessionId, clipId },
    },
    history,
  } = props;

  useEffect(() => {
    if (!sessionId) {
      history.replace("/");
      return;
    }

    if (!clipId) {
      history.replace(`/sessions/${sessionId}`);
      return;
    }

    console.log("hendrik: ClipDetail is selecting the clip ", {
      sessionId,
      clipId,
    });
    selectClip(sessionId, clipId);
  }, [sessionId, clipId, history]);

  if (!selectedClip) {
    return null;
  }

  const handleAddAudioClipClick = () => {
    addAudioToClip(history);
  };

  const handleEndClipClick = () => {
    endClip(history);
  };

  const handleAbortClipClick = () => {
    abortClip(history);
  };

  let audioClips;
  if (_.values(selectedClip.audioClips).length) {
    console.log("audio clips: ", _.values(toJS(selectedClip).audioClips));
    const clipsEls = _.values(selectedClip.audioClips).map((ac, i) => (
      <div
        className="d-flex m-0 border-bottom p-4 justify-content-between"
        key={ac.id}
      >
        <div className="mt-1">
          <AudioIcon />
        </div>
        <div className="align-self-center">
          <h1 className="font-weight-light mb-0">#{i + 1}</h1>
        </div>
        <div>
          <h1 className="font-weight-light mb-0">
            {getDurationStr(ac.startDate, ac.endDate)}
          </h1>
        </div>
      </div>
    ));

    audioClips = (
      <div>
        <h5 className="mt-5">Audio</h5>
        <div className="card mb-2 p-0">{clipsEls}</div>

        {audioClips}
      </div>
    );
  }

  return (
    <div className="mb-5 below-card-3">
      <h5>Video</h5>
      <div className="card mb-2 p-0">
        <div className="card-body">
          <div className="row m-0 p-2 pt-3 pb-3 p-md-20 justify-content-between">
            <CameraIcon />
            <h1 className="font-weight-light mb-0">
              {getDurationStr(selectedClip.startDate, selectedClip.endDate)}
            </h1>
          </div>
        </div>
      </div>
      {audioClips}

      {!selectedSession.completed && (
        <FabButton
          main={{
            image: clapperSrc,
            hoverImage: addSrc,
            extraClass: "btn-primary",
            tooltip: "Add Audio",
            clickHandler: handleAddAudioClipClick,
          }}
          buttons={[
            {
              tooltip: "Abort clip",
              extraClass: "btn-warning",
              image: cancelSrc,
              clickHandler: handleAbortClipClick,
            },
            {
              tooltip: "Save clip",
              extraClass: "btn-primary",
              image: stopSrc,
              clickHandler: handleEndClipClick,
            },
          ]}
        />
      )}
    </div>
  );
});

export default ClipDetail;
