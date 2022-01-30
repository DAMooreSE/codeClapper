Make sure you have the following softwares installed before proceeding:
*Visual Studio Code 'https://code.visualstudio.com/download'
*NodeJS and npm package manager 'https://nodejs.org/en/download/'

0.ENSURE YOU'RE USING A FRESH COPY OF THE CODE EVERY TIME YOU DEPLOY FROM SCRATCH!
0.1.It's much easier to download and copy a fresh copy of the project code from github every new attempt to deploy.
0.2.If theres any node_modules folders, any package-lock.json files, a ".creds.json" file under recorder, or a build folder under clapper, delete any and all of these.

//Installing Dependencies
0.1.If Using git, Pull any changes made to the master branch.
1.Download and Open the project folder '/copy-of-master/' in Visual Studio Code


//Now we install the necessary packages to run the application:
2.Select Terminal > New Terminal on the menu bar
3.If not done previously, Run 'npm install -g yarn' (only done if yarn hasn't been installed on your machine before)
4.Run 'npm run install' and wait for the dependencies to install
5.Run 'npm install firebase'
6.Run 'npm run build-clapper' which should start and run the UI service
//This should open a browser to the local webpage 'localhost:3006' where the application is deployed to
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser

//OPTIONAL FIX IF STEP 5 DOESN'T WORK:
6.1 Run 'cd clapper'
6.2.Run 'yarn build'
6.3.Run 'yarn install --frozen-lockfile'
6.4.Run 'yarn start'


//Now register your user
7.Leave the other terminal open and running and open a new one in Visual Studio with Terminal > New Terminal 
8.Run 'cd recorder'
9.Run 'node index.js signup --email YOUREMAIL --password YOURPASSWORD' (THIS WILL SAVE TO AN ONLINE DATABASE NOW, ONLY DONE ONCE!)
10.Run "npm run start" which should start the recording service

//Using CodeClapper
11. Open 'localhost:3006' in a new PRIVATE window in a browser and try to login with your new login.
//Some browsers will cache the old login so a private window ensure this doesn't happen

	
//Potential packages that might need to be installed manually (if you get an error saying something like 'firebase is not defined'
//or some other package, go to the home directory of the project and enter 'npm install -g PACKAGE'
//(possible packages: 'firebase','firebase-tools','yarn','react','react-app-rewind','react-scripts')


//Before I could install additional npm packages I had to take ownership of its files, if you get an error when running this, use this command if similar problem is ran into:
//1.5. Open a terminal run 'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'