Download /test-build-4-26 from the test-builds folder and follow the steps in "howToDeploy.txt" to deploy the newest build of CodeClapper, making sure you replace the firebase configuration with yours.
If you want to change the audio or video codec/settings, press ctrl+c in the 2nd terminal that's running the recorder to stop it.
In the file /test-build-4-26/recorder/lib/export.js you need to change two lines.
Line 86 [ audioFileLocation = `${exportPath}/${numberPrefix + 1}.ac3` ] - if you want to change the audio codec, change the file type as well
Line 128 [ videoArgs.push("-c:v copy", "-c:a ac3") ] is where you can change the video and audio encoders.
Once you've made your changes, run "npm run start" in the terminal that you previously stopped.
On the localhost webpage, click the codeClapper logo in the top left of the screen to return to the homepage and start a new recording.
If unable to succesfully export, look at the previously mentioned terminal for information on the error.

If you don't want to download and set up another build from scratch, you can delete the directories/files:
/clapper/build, /clapper/node_modules, /recorder/node_modules, /recorder/exports, /recorder/output, /recorder/.creds.json, and /recorder/yarn.lock
And then edit the files to your current codeClapper build and make the following changes:
/recorder/commands/startCommand.js - Removed the codec argument on line 70 since it's meaningless
/recorder/lib/export.js - Changed line 85 to be a .ac3 file instead of .aac
/recorder/lib/export.js - Changed line 121 to [ videoArgs.push("-c:v copy", "-c:a ac3") ] so it'd use the ac3 codec for audio instead of aac
(These two lines are the same lines that I mention above that you'll edit to change the codecs used.)
After saving the files, follow the steps to build and deploy codeClapper:
New terminal -> 'npm run install'
After executing -> 'npm run build-clapper'
Open another terminal -> 'cd recorder'
Login with your account -> 'node index.js login --email YOUREMAIL --password YOURPASSWORD' 
Then start the recording process -> 'npm run start'
Open a new 'incognito' tab in the browser and go to localhost:3006 (or YOUR_PC_IP_ADDRESS:3006) to test