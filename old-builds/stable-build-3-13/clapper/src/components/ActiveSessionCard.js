import React from "react";
import { observer } from "mobx-react";

import CardLink from "./CardLink";

const ActiveSessionCard = observer((props) => {
  const { session } = props;

  console.log("buksie: do I have the session? ", session);

  if (!session) {
    return null;
  }

  return (
    <CardLink to={`/sessions/${session.id}`}>
      <div className="card text-white bg-primary mb-3">
        <div className="card-body">
          <h3 className="card-title">Active Session</h3>
          <div className="row">
            <div className="col-md-8 mb-2 mb-md-0">
              <h4 className="mb-sm-0 text-dark font-weight-light">Started</h4>
              <h4 className="font-weight-bold">{session.startDateF}</h4>
            </div>
            <div className="col-md-2 mb-2 mb-md-0">
              <h4 className="mb-sm-0 text-dark font-weight-light">
                # of Clips
              </h4>
              <h4 className="font-weight-bold">{session.clipCount}</h4>
            </div>
            <div className="col-md-2 mb-2 mb-md-0">
              <h4 className="mb-sm-0 text-dark font-weight-light">Duration</h4>
              <h4 className="font-weight-bold">{session.duration}</h4>
            </div>
          </div>
        </div>
      </div>
    </CardLink>
  );
});

export default ActiveSessionCard;
