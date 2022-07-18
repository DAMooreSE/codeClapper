const fs = require("fs")
const { getVideoDurationInSeconds } = require("get-video-duration")
const executeShellCmd = require("../lib/executeShellCmd")
const ffmpeg = require("ffmpeg-static")
const pad = require("pad-left")
const rimraf = require("rimraf")

const EXPORT_CLIP_DURATION = 5
const EXPORT_CLIP_PADDING = 0.25

async function main() {
  const clipPath = process.argv[2]
  const outPath = process.argv[3]

  console.log(`going to split clip ${clipPath} into chunks at target ${outPath}`)

  if (!fs.existsSync(clipPath)) {
    console.error("could not find keynote export at ", clipPath)
    process.exit()
  }

  const videoDuration = await getVideoDurationInSeconds(clipPath)

  console.log("The video duration is ", videoDuration)

  const clipCount = Math.ceil(videoDuration / EXPORT_CLIP_DURATION)

  console.log(clipCount)

  if (fs.existsSync(outPath)) {
    rimraf.sync(outPath)
  }

  fs.mkdirSync(outPath)

  for (let i = 0; i < clipCount; i++) {
    const videoArgs = ["-y"]

    videoArgs.push(
      //-ss
      //When used as an input option (before -i), seeks in this input file to position.
      //When used as an output option (before an output url), decodes but discards input until the timestamps reach position.
      "-ss",
      `00:00:${pad(i * EXPORT_CLIP_DURATION, 2, "0")}.1`, //start
      //00:00:XX.1 = clip duration < 
      //-t
      //When used as an input option (before -i), limit the duration of data read from the input file.
      //When used as an output option (before an output url), stop writing the output after its duration reaches duration.
      "-t",
      `00:00:0${EXPORT_CLIP_DURATION - EXPORT_CLIP_PADDING}`, //end
      "-i",
      clipPath, //input file
      `${outPath}/clip-${i + 1}.mp4`
    )

    videoArgs.push()

    const videoCmd = `${ffmpeg} ${videoArgs.join(" ")}`

    console.log(videoCmd)

    await executeShellCmd(videoCmd)
  }
}

main()
