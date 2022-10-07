const _ = require("lodash")
const pad = require("pad-left")
const fs = require("fs")
const path = require("path")
const moment = require("moment")
const ffmpeg = require("ffmpeg-static")
const { OUTPUT_PATH, EXPORT_PATH } = require("./constants")
const executeShellCmd = require("./executeShellCmd")

function sortClipsForExport(clips) {
  return _(clips)
    .filter((c) => c.completed)
    .map((c) => ({ ...c, tempStartDate: new Date(c.startDate) }))
    .orderBy(["tempStartDate"], ["asc"])
    .value()
}

function getDuration(start, end) {
  const startMoment = moment(start)
  const timeMoment = moment(end)

  const durationFromStart = moment.duration(timeMoment.diff(startMoment))
  return (
    // tslint:disable-next-line:prefer-template
    pad(durationFromStart.get("hours"), 2, "0") +
    ":" +
    pad(durationFromStart.get("minutes"), 2, "0") +
    ":" +
    pad(durationFromStart.get("seconds"), 2, "0") +
    "." +
    durationFromStart.get("milliseconds")
  )
}

function prepClipForExport(sessionStartDate, c) {
  c.endMarker = getDuration(sessionStartDate, c.endDate)
  c.startMarker = getDuration(sessionStartDate, c.startDate)

  _.values(c.audioClips).forEach((ac) => {
    ac.endMarker = getDuration(sessionStartDate, ac.endDate)
    ac.startMarker = getDuration(sessionStartDate, ac.startDate)
  })

  return c
}

async function exportClip(sessionStartDate, videoFilePath, exportPath, numberPrefix, clip) {
  // appStore().setExportProgress({
  //   currentClip: i + 1,
  // })

  if (!fs.existsSync(EXPORT_PATH)) {
    fs.mkdirSync(EXPORT_PATH)
  }

  if (!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath)
  }

  let totalAudioDuration = 0
  let audioFileLocation
  let clipEnd = new Date(clip.endDate).getTime()

  if (clip.audioClips && Object.keys(clip.audioClips).length) {
    console.log("working with clip ", clip.id)

    const sortedAudioClips = sortClipsForExport(Object.values(clip.audioClips))

    clipEnd = clipEnd || new Date(_.first(sortedAudioClips).startDate).getTime()
    const audioArgs = ["-y"]
    let filterStreams = ""

    sortedAudioClips.forEach((audio, j) => {
      const audioStart = new Date(audio.startDate).getTime()
      const audioEnd = new Date(audio.endDate).getTime()

      totalAudioDuration += audioEnd - audioStart
      audioArgs.push("-ss", getDuration(sessionStartDate, audioStart))
      audioArgs.push("-t", getDuration(audioStart, audioEnd))
      audioArgs.push("-i", videoFilePath)

      filterStreams += `[${j}:a]`
    })

    //MUST CHANGE THE FILE TYPE IF YOU EDIT THE AUDIO ENCODER
    audioFileLocation = `${exportPath}/${numberPrefix + 1}.aac`
    //audioFileLocation = `${exportPath}/${numberPrefix + 1}.aac`

    audioArgs.push(
      "-filter_complex",
      `"${filterStreams} concat=n=${sortedAudioClips.length}:v=0:a=1[outa]"`,
      '-map "[outa]" -ac 1 ',
      '-c:a aac -b:a 160k -cutoff 15000',
      //'-c:a libfaac -q:a 330 -cutoff 15000',
      audioFileLocation
    )

    const combinedAudioArgs = audioArgs.join(" ")

    const audioCmd = `${ffmpeg} ${combinedAudioArgs}`
    console.log("[AUDIO EXPORT]:", audioCmd)
    await executeShellCmd(audioCmd)
  }

  let videoDurationInTicks = clipEnd - new Date(clip.startDate).getTime()
  if (totalAudioDuration > videoDurationInTicks) {
    console.log("audio is longer than video clip - making the video longer")
    videoDurationInTicks = totalAudioDuration
  }
  const videoArgs = ["-y"]

  videoArgs.push(
    "-ss",
    getDuration(sessionStartDate, new Date(clip.startDate).getTime()),
    "-t",
    getDuration(sessionStartDate, sessionStartDate + videoDurationInTicks),
    "-i",
    videoFilePath
  )

  if (audioFileLocation) {
    videoArgs.push("-i", audioFileLocation)
  }

  //-c:v copy = codec:video copy default (h264)
  //can subsitute copy with other video encoders such as 'hevc', 'proRes422', 'avi', etc
  //-c:a ac3 = codec:audio is ac3
  //can subsitute ac3 with copy or other audio encoders such as 'aac', 'mp3', 'flac', etc
  //WARNING: 'flac' audio files can't be used in mp4s, which is the current file type
  videoArgs.push("-c:v copy", "-c:a aac")
  videoArgs.push("-map", "0:v:0")
  if (audioFileLocation) {
    videoArgs.push("-map", "1:a:0")
  } else {
    videoArgs.push("-map", "0:a:0")
  }

  const videoClipExportPath = `${exportPath}/${numberPrefix + 1}-${clip.id}.mp4`
  videoArgs.push(videoClipExportPath)

  const videoCmd = `${ffmpeg} ${videoArgs.join(" ")}`
  console.log("[VIDEO EXPORT]:", videoCmd)
  console.log({ videoDurationInTicks, totalAudioDuration })
  console.log(
    `clip ${numberPrefix} duration:   `,
    getDuration(sessionStartDate, sessionStartDate + videoDurationInTicks)
  )
  try {
    await executeShellCmd(videoCmd)
    return videoClipExportPath
  } catch (err) {
    console.log("error while trying to run the video command", {
      clip,
      cmd: videoCmd,
    })

    throw err
  }
}

async function exportSession(session) {
  console.log("this is the export session ", session)

  const videoFilePath = path.join(OUTPUT_PATH, `${session.id}.mp4`)
  const exportPath = path.join(EXPORT_PATH, session.id)

  const offset = 0

  const sessionStartDate = moment(new Date(session.startDate)).add(offset, "milliseconds").valueOf()

  const sortedClips = sortClipsForExport(Object.values(session.clips))

  sortedClips.forEach((c) => prepClipForExport(sessionStartDate, c))

  for (let i = 0; i < sortedClips.length; i++) {
    const clip = sortedClips[i]
    await exportClip(sessionStartDate, videoFilePath, exportPath, i, clip)
  }

  return exportPath
}

function openExportPath(path) {
  require("child_process").exec(`open ${path}`)
}

module.exports = {
  exportClip,
  exportSession,
  openExportPath,
}
