import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import "./Main.css";
import Home from "./Home";
import SessionDetail from "./SessionDetail";
import RecordingVideo from "./RecordingVideo";
import StartRecording from "./StartRecording";
import RecordingAudio from "./RecordingAudio";
import Exporting from "./Exporting";
import ClipDetail from "./ClipDetail";
import Login from "./Login";
import store from "../stores/AppStore";
import { observer } from "mobx-react";
import checkAuthState from "../orchestrations/checkAuthState";
import Spinner from "./Spinner";

function handleAnywhereClick() {
  // store.setFabOpenState(false)
}

const Main = observer((props) => {
  const { apiHasError, checkingAuth, profile } = store;
  console.log(props);

  useEffect(() => {
    checkAuthState();
  }, []);

  if (checkingAuth) {
    return <Spinner />;
  }

  if (!checkingAuth && !profile) {
    return <Login />;
  }

  return (
    <main className="container pt-3 pt-md-5" onClick={handleAnywhereClick}>
      {apiHasError && (
        <div class="alert alert-danger" role="alert">
          There was an API error!!!
        </div>
      )}

      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/record" component={StartRecording} />
        <Route
          exact={true}
          path="/sessions/:sessionId"
          component={SessionDetail}
        />
        <Route
          exact={true}
          path="/sessions/:sessionId/clips/:clipId/video"
          component={RecordingVideo}
        />
        <Route
          exact={true}
          path="/sessions/:sessionId/clips/:clipId"
          component={ClipDetail}
        />
        <Route
          exact={true}
          path="/sessions/:sessionId/clips/:clipId/audio/:audioClipId"
          component={RecordingAudio}
        />
        <Route
          exact={true}
          path="/sessions/:sessionId/exporting"
          component={Exporting}
        />
      </Switch>
    </main>
  );
});

export default Main;
