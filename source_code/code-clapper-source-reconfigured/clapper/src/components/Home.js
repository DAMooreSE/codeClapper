import React, { useEffect } from "react";
import { observer } from "mobx-react";

import store from "../stores/AppStore";
import loadSessions from "../orchestrations/loadSessions";
import SessionList from "./SessionList";
import ActiveSessionCard from "./ActiveSessionCard";
import Spinner from "./Spinner";
import FabButton from "./FabButton";
import addSrc from "./images/add.png";

// import syncUserState from "../orchestrations/syncUserState";

const Home = observer((props) => {
  const {
    activeSession,
    completedSessions,
    abortedSessions,
    initializedData,
    // initializedProfile,
    profile,
  } = store;

  useEffect(() => {
    // syncUserState();
    if (profile) {
      loadSessions();
    }
  }, [profile]);

  if (!initializedData) {
    return <Spinner />;
  }

  function handleAddClick() {
    props.history.push("/record");
  }

  return (
    <div className="Home">
      <ActiveSessionCard session={activeSession} />
      <SessionList label="Completed sessions" sessions={completedSessions} />
      <SessionList label="Aborted sessions" sessions={abortedSessions} />
      <div className="mb-5">
        <FabButton
          main={{
            image: addSrc,
            hoverImage: addSrc,
            extraClass: "btn-primary",
            tooltip: "Add Session",
            clickHandler: handleAddClick,
          }}
          buttons={[]}
        />
      </div>
    </div>
  );
});

export default Home;
