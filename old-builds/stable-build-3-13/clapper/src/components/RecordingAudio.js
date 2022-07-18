import React, { Component, useEffect, useState } from "react";
import { observer } from "mobx-react";
import store from "../stores/AppStore";
import selectAudioClip from "../orchestrations/selectAudioClip";
import audioIcon from "./images/recording-audio@2x.png";
import endAudioClip from "../orchestrations/endAudioClip";
import abortAudioClip from "../orchestrations/abortAudioClip";
import restartAudioClip from "../orchestrations/restartAudioClip";
import getDurationStr from "../utils/getDurationStr";
import FabButton from "./FabButton";
import clapperSrc from "./images/clapper.png";
import stopSrc from "./images/stop.png";
import addSrc from "./images/add.png";
import restartSrc from "./images/restart.png";
import cancelSrc from "./images/cancel2.png";
import { VerticalCenteredContainer } from "./styles";

const RecordingAudio = observer((props) => {
  const [timerLabel, setTimerLabel] = useState("...");

  const {
    match: {
      params: { sessionId, clipId, audioClipId },
    },
    history,
  } = props;
  const { selectedAudioClip } = store;

  useEffect(() => {
    if (!sessionId) {
      history.replace("/");
      return;
    }

    if (!clipId) {
      history.replace(`/sessions/${sessionId}`);
      return;
    }

    if (!audioClipId) {
      history.replace(`/sessions/${sessionId}/clips/${clipId}`);
    }

    console.log("buksie: going to selected audio clip!!!");
    selectAudioClip(sessionId, clipId, audioClipId);
  }, [sessionId, clipId, history, audioClipId]);

  useEffect(() => {
    if (!selectedAudioClip) {
      return;
    }

    const timer = setInterval(() => {
      const durationText = getDurationStr(
        new Date(selectedAudioClip.startDate),
        new Date()
      );

      setTimerLabel(durationText);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [selectedAudioClip]);

  if (!selectedAudioClip) {
    return;
  }

  const handleAudioClipEndClick = (addNew) => {
    if (addNew) {
      setTimerLabel("...");
    }

    endAudioClip(history, addNew);
  };

  const getAudioClipEnHandler = (addNew) => {
    return () => {
      handleAudioClipEndClick(addNew);
    };
  };

  const handleRestartAudioClipClick = () => {
    setTimerLabel("...");
    restartAudioClip(history);
  };

  const handleAbortAudioClipClick = () => {
    abortAudioClip(history);
  };

  return (
    <div className="mb-5 below-card-2">
      <VerticalCenteredContainer>
        <div className="row align-items-center h-100">
          <div className="col-12 mx-auto">
            <div className="d-flex flex-column align-items-center">
              <div className="mt5">
                <img alt="Recording icon" src={audioIcon} />
              </div>
              <h3 className="text-muted mt-3">Audio Duration</h3>
              <h1 className="display-4">{timerLabel}</h1>
            </div>
          </div>
        </div>
      </VerticalCenteredContainer>
      <FabButton
        main={{
          image: clapperSrc,
          hoverImage: addSrc,
          extraClass: "btn-primary",
          tooltip: "Save and add new Audio",
          clickHandler: getAudioClipEnHandler(true),
          open: false,
        }}
        buttons={[
          {
            tooltip: "Abort audio",
            extraClass: "btn-warning",
            image: cancelSrc,
            clickHandler: handleAbortAudioClipClick,
          },
          {
            tooltip: "Restart audio",
            extraClass: "btn-primary",
            image: restartSrc,
            clickHandler: handleRestartAudioClipClick,
          },
          {
            tooltip: "Save audio",
            extraClass: "btn-primary",
            image: stopSrc,
            clickHandler: getAudioClipEnHandler(false),
          },
        ]}
      />
    </div>
  );
});

@observer
class RecordingVideo1 extends Component {
  state = {
    timerLabel: "...",
  };

  handleLoad = async (props) => {
    console.log("in handle Load!!!");
    const {
      match: {
        params: { sessionId, clipId, audioClipId },
      },
      history,
    } = props;

    if (!sessionId) {
      history.replace("/");
      return;
    }

    if (!clipId) {
      history.replace(`/sessions/${sessionId}`);
      return;
    }

    if (!audioClipId) {
      history.replace(`/sessions/${sessionId}/clips/${clipId}`);
    }

    await selectAudioClip(sessionId, clipId, audioClipId);
    const { selectedAudioClip } = store;

    if (!selectedAudioClip) {
      return;
    }

    if (this.timer) {
      console.log("going to clear interval");
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      const durationText = getDurationStr(
        new Date(selectedAudioClip.startDate),
        new Date()
      );

      this.setState({
        timerLabel: durationText,
      });
    }, 50);
  };

  async componentDidMount() {
    await this.handleLoad(this.props);
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    console.log("component will receive props! ", nextProps);
    await this.handleLoad(nextProps);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleAudioClipEndClick = (addNew) => {
    const { history } = this.props;

    if (addNew) {
      this.setState({
        timerLabel: "...",
      });
    }

    endAudioClip(history, addNew);
  };

  getAudioClipEnHandler = (addNew) => {
    return () => {
      this.handleAudioClipEndClick(addNew);
    };
  };

  handleRestartAudioClipClick = () => {
    this.setState({
      timerLabel: "...",
    });
    const { history } = this.props;
    restartAudioClip(history);
  };

  handleAbortAudioClipClick = () => {
    const { history } = this.props;
    abortAudioClip(history);
  };

  render() {
    const { timerLabel } = this.state;

    return (
      <div className="mb-5 below-card-2">
        <VerticalCenteredContainer>
          <div className="row align-items-center h-100">
            <div className="col-12 mx-auto">
              <div className="d-flex flex-column align-items-center">
                <div className="mt5">
                  <img alt="Recording icon" src={audioIcon} />
                </div>
                <h3 className="text-muted mt-3">Audio Duration</h3>
                <h1 className="display-4">{timerLabel}</h1>
              </div>
            </div>
          </div>
        </VerticalCenteredContainer>
        <FabButton
          main={{
            image: clapperSrc,
            hoverImage: addSrc,
            extraClass: "btn-primary",
            tooltip: "Save and add new Audio",
            clickHandler: this.getAudioClipEnHandler(true),
            open: false,
          }}
          buttons={[
            {
              tooltip: "Abort audio",
              extraClass: "btn-warning",
              image: cancelSrc,
              clickHandler: this.handleAbortAudioClipClick,
            },
            {
              tooltip: "Restart audio",
              extraClass: "btn-primary",
              image: restartSrc,
              clickHandler: this.handleRestartAudioClipClick,
            },
            {
              tooltip: "Save audio",
              extraClass: "btn-primary",
              image: stopSrc,
              clickHandler: this.getAudioClipEnHandler(false),
            },
          ]}
        />
      </div>
    );
  }
}

export default RecordingAudio;
