import _ from "lodash";
import moment from "moment";

export function getDurationStringFromTicks(ticks) {
  const duration = moment.duration(ticks);
  const minutes = duration.get("minutes");
  const seconds = duration.get("seconds");

  return `${minutes}m${seconds}s`;
}

export function getAudioDurationOfClip(c) {
  const audioDuration = _(c.audioClips)
    .values()
    .filter((ac) => ac.completed)
    .reduce((sum, ac) => {
      const clipDuration =
        new Date(ac.endDate || 0).getTime() - new Date(ac.startDate).getTime();
      return clipDuration;
    }, 0);

  return getDurationStringFromTicks(audioDuration);
}

export function getVideoDurationOfClip(c) {
  const durationInTicks =
    new Date(c.endDate || 0).getTime() - new Date(c.startDate).getTime();
  const videoDuration = getDurationStringFromTicks(durationInTicks);
  return videoDuration;
}

export function getDurationStringFromSession(session) {
  const duration = _(session.clips)
    .values()
    .filter({ completed: true })
    .reduce((clipSum, c) => {
      if (!c.endDate) {
        console.warn("why did we get a clip without an end date?");
      }
      const videoClipDuration =
        new Date(c.endDate || 0).getTime() - new Date(c.startDate).getTime();
      const audioClipVals = _.values(c.audioClips);

      const audioDuration = _(audioClipVals)
        .filter({ completed: true })
        .reduce(
          (audioClipSum, ac) =>
            audioClipSum +
            (new Date(ac.endDate || 0).getTime() -
              new Date(ac.startDate).getTime()),
          0
        );

      return clipSum + Math.max(videoClipDuration, audioDuration);
    }, 0);

  return getDurationStringFromTicks(duration);
}

const format = "ddd, MMM D YYYY [at] HH:mm";

export function formatClip(c) {
  return {
    ...c,
    startDateF: moment(c.startDate).format(format),
    endDateF: moment(c.endDate).format(format),
    audioDuration: getAudioDurationOfClip(c),
    videoDuration: getVideoDurationOfClip(c),
    audioClips: _(c.audioClips)
      .pickBy((v) => !v.aborted)
      .value(),
  };
}

export function formatSession(s) {
  return {
    ...s,
    startDateF: moment(s.startDate).format(format),
    endDateF: moment(s.endDate).format(format),
    clipCount: _(s.clips).values().filter({ completed: true }).value().length,
    duration: getDurationStringFromSession(s),
    clips: _(s.clips)
      .pickBy((v) => !v.aborted)
      .mapValues(formatClip)
      .value(),
  };
}

export function sortSessionsInDescOrder(sessions) {
  return _(sessions)
    .map((s) => ({ ...s, tempStartDate: new Date(s.startDate) }))
    .orderBy(["tempStartDate"], ["desc"])
    .value();
}

export function prepClipsForExport(clips) {
  return _(clips)
    .filter((c) => c.completed)
    .map((c) => ({ ...c, tempStartDate: new Date(c.startDate) }))
    .orderBy(["tempStartDate"], ["asc"])
    .value();
}
