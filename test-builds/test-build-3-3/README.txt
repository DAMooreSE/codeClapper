Make sure you have the following softwares installed before proceeding:
*Visual Studio Code 'https://code.visualstudio.com/download'
*NodeJS and npm package manager 'https://nodejs.org/en/download/'

0.ENSURE YOU'RE USING A FRESH COPY OF THE CODE EVERY TIME YOU DEPLOY FROM SCRATCH!
0.1.It's much easier to download and copy a fresh copy of the project code from github every new attempt to deploy.
0.2.If theres any node_modules folders, any package-lock.json files, a ".creds.json" file under recorder, or a build folder under clapper, delete any and all of these.

//Installing Dependencies
1.If Using git, Pull any changes made to the master branch.
1.1.Download and Open the project folder '/copy-of-master/' in Visual Studio Code

2.//Reconfiguring Firebase
2.2.Open a web browser and go to https://firebase.google.com/
2.3.Select "Create a project"
2.4.Name your project whatever you want, I use "codeClapper", and accept the terms and continue
2.5.Make sure Google Analytics is NOT enabled for the project and then select "create project"
2.6.Select the gear icon next to "project overview" and then "project settings"
2.7.Under "your apps", select the option to add a new web application.
2.8.Again, name your app whatever you want, I stick with codeClapper, and check the box to set up firebase hosting before selecting "register app"
2.9.Go back to Visual studio code and Select Terminal > New Terminal on the menu bar then enter "npm install firebase"
2.10.Return to the firebase web page and copy everything in the larger text box, this is our base firebase config but will need changes.
2.11.Open /copy-of-master/recorder/index.js and replace lines 16-29 with the copied text and save.
2.12.Open /copy-of-master/clapper/src/services/api.js and replace lines 7-20 with the copied text and save.
//We'll be making changes to these lines so keep these files open
2.13.Go back to Visual Studio Code and enter "npm install -g firebase-tools" in the terminal. //add "sudo" before if needed
2.14.Go back to the Firebase webpage and select "build", then "authentication", then "get started"
2.15.Select "Email/Password" from "Native providers" under "sign-in providers"
2.16.Enable Email/Password and click "save"
2.17.Select "Firestore Database" under "Build" then "create database"
2.18.Select "Start in production mode" and then select "next"
2.19.Select whatever datacenter you'd like the database to be hosted at and select "enable"
2.20.Staying in "firestore database", select the "Rules" tab and change line 5 to "if true;" instead of "if false;" and select publish
2.21.Select "realtime database" under "Build", then "create database", select "start in locked mode" and then "enable"
2.22.Staying in "realtime database", select the "rules" tab and then change "false" to "true" on lines 3 and 4 before selecting "publish"
//You might get a warning about open database access, just ignore it and continue
2.23.Staying in "realtime database", select the "Data" tab and copy the url of the database
2.24.Open /recorder/index.js and /clapper/src/services/api.js again and add the line:
	'databaseURL: "YOURDATABASEURLHERE",' underneath the "authDomain" lines (lines 20 and 11 respectively)
2.25.Change the lines "const firebaseConfig = {" to "var firebaseConfig = {" in the same files.
2.26.Change the lines "const app = firebase.initializeApp(firebaseConfig);" to "firebase.initalizeApp(firebaseConfig);" in the same files.
//You're now finished setting up and implementing a new FireBase project for your application


//Now we install the necessary packages to run the application:
3.Open Visual Studio Code again and ensure your terminal is open at the main project folder /copy-of-master
//if it's not, you can simply close the terminal and open a new one using Terminal > New Terminal on the menu bar.
4.If not previously installed, Run 'sudo npm install -g yarn' (only done if yarn hasn't been installed on your machine before)
5.Run 'npm run install' and wait for the dependencies to install
6.Run 'npm run build-clapper' which should start and run the UI service
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser

//OPTIONAL FIX IF STEP 6 DOESN'T WORK:
6.1 Run 'cd clapper'
6.2.Run 'yarn build'
6.3.Run 'yarn install --frozen-lockfile'
6.4.Run 'yarn start'

//Now register your user
7.Leave the other terminal open and running and open a new one in Visual Studio with Terminal > New Terminal 
8.Run 'cd recorder'
9.If you haven't created a profile yet, Run 'node index.js signup --email YOUREMAIL --password YOURPASSWORD' (THIS WILL SAVE TO AN ONLINE DATABASE NOW, ONLY DONE ONCE!)
9.1.If you already have a profile created but get the "You need to be logged in first" error, then sign in with this command instead:
	'node index.js login --email YOUREMAIL --password YOURPASSWORD'
//You'll probably need to press control + c to quit the function after successfully logging in or creating an account
10.Run "npm run start" which should start the recording service

//Using CodeClapper
11. Open 'localhost:3006' in a new PRIVATE window in a browser and try to login with your new login.
//Some browsers will cache the old login so a private window ensure this doesn't happen


//Before I could install additional npm packages I had to take ownership of its files, if you get an error when running this, use this command if similar problem is ran into:
//1.5. Open a terminal run 'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'