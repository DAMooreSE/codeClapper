import React, { useEffect } from "react";
import { observer } from "mobx-react";
import CardLink from "./CardLink";
import loadSessions from "../orchestrations/loadSessions";
import { withRouter } from "react-router-dom";

const SessionList = withRouter(
  observer((props) => {
    console.log(props);
    const { sessions, label } = props;

    useEffect(() => {
      loadSessions();
    }, []);

    if (!sessions || !sessions.length) {
      return null;
    }

    const sessionEls = sessions.map((s) => (
      <CardLink
        key={s.id}
        to={`/sessions/${s.id}`}
        className="row m-0 border-bottom p-2 p-md-20"
      >
        <div className="col-8">
          <div className="row">
            <div className="col-md-6 mb-2 mb-md-0">
              <div className="text-muted">Started</div>
              <div className="font-weight-bold text-dark">{s.startDateF}</div>
            </div>
            <div className="col-md-6 mb-2 mb-md-0">
              <div className="text-muted">Ended</div>
              <div className="font-weight-bold text-dark">{s.endDateF}</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <div className="text-muted"># of Clips</div>
              <div className="font-weight-bold text-dark">{s.clipCount}</div>
            </div>
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <div className="text-muted">Duration</div>
              <div className="font-weight-bold text-dark">{s.duration}</div>
            </div>
          </div>
        </div>
      </CardLink>
    ));

    return (
      <div className="mb-5">
        <h5>{label}</h5>
        <div className="card mb-2 p-0">{sessionEls}</div>
      </div>
    );
  })
);

export default SessionList;
