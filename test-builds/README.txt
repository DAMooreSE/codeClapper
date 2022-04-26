This is a directory containing experimental builds of the codeClapper software. 
These builds have no guaruntee of functioning properly and should only be used to deploy CodeClapper when directed to do so.

test-build-4-26 changes made:
 * Edited /recorder/commands/startCommand.js so that the recorder records using 30fps and the hevc codec.
 * Edited /recorder/api/subscribeToClips.js so that there's a commented out copy of the ffmpeg command with the vcodec and acodec values changed to hevc and flac, respectively.
