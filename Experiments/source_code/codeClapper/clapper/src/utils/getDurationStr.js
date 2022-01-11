import moment from "moment";

export default function getDurationStr(startDate, endDate) {
  const duration = moment.duration(moment(endDate).diff(new Date(startDate)));
  const minutes = duration.get("minutes");
  const seconds = duration.get("seconds");

  return `${minutes}m${seconds}s`;
}
