import React, { Component, useState, useEffect } from "react";
import { observer } from "mobx-react";
import store from "../stores/AppStore";
import selectClip from "../orchestrations/selectClip";
import videoIcon from "./images/recording-video@2x.png";
import endClipVideo from "../orchestrations/endClipVideo";
import restartClip from "../orchestrations/restartClip";
import abortClip from "../orchestrations/abortClip";
import { VerticalCenteredContainer } from "./styles";
import getDurationStr from "../utils/getDurationStr";
import FabButton from "./FabButton";
import clapperSrc from "./images/clapper.png";
import stopSrc from "./images/stop.png";
import restartSrc from "./images/restart.png";
import cancelSrc from "./images/cancel2.png";

const RecordingVideo = observer((props) => {
  const [timerLabel, setTimerLabel] = useState("...");
  const { selectedClip } = store;
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

    console.log("going to select the clip on the store ", {
      sessionId,
      clipId,
    });
    selectClip(sessionId, clipId);
  }, [sessionId, clipId, history]);

  useEffect(() => {
    if (!selectedClip) {
      console.log("could not find selected clip");
      return;
    }

    const timer = setInterval(() => {
      const durationText = getDurationStr(
        new Date(selectedClip.startDate),
        new Date()
      );

      setTimerLabel(durationText);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [selectedClip]);

  const handleClipEndClick = () => {
    endClipVideo(history);
  };

  const handleAbortClipClick = () => {
    abortClip(history);
  };

  const handleClipRestartClick = () => {
    setTimerLabel("...");
    restartClip(history);
  };

  return (
    <div className="mb-5 below-card-2">
      <VerticalCenteredContainer>
        <div className="row align-items-center h-100">
          <div className="col-12 mx-auto">
            <div className="d-flex flex-column align-items-center">
              <div className="mt0">
                <img alt="Recording icon" src={videoIcon} />
              </div>
              <h3 className="text-muted mt-3">Video Duration</h3>
              <h1 className="display-4">{timerLabel}</h1>
            </div>
          </div>
        </div>
      </VerticalCenteredContainer>
      <FabButton
        main={{
          image: clapperSrc,
          hoverImage: stopSrc,
          extraClass: "btn-primary",
          tooltip: "Save Video",
          clickHandler: handleClipEndClick,
          open: false,
        }}
        buttons={[
          {
            tooltip: "Abort clip",
            extraClass: "btn-warning",
            image: cancelSrc,
            clickHandler: handleAbortClipClick,
          },
          {
            tooltip: "Restart video",
            extraClass: "btn-primary",
            image: restartSrc,
            clickHandler: handleClipRestartClick,
          },
        ]}
      />
    </div>
  );
});

export default RecordingVideo;
