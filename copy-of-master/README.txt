Make sure you have the following softwares installed before proceeding:
*Visual Studio Code 'https://code.visualstudio.com/download'
*NodeJS and npm package manager 'https://nodejs.org/en/download/'


//Installing Dependencies
1.Download and Open the project folder '/copy-of-master/' in Visual Studio Code


//Now we install the necessary packages to run the application:
2.Select Terminal > New Terminal on the menu bar
3.If not done previously, Run 'npm install -g yarn' (only done if yarn hasn't been installed on your machine before)
4.Run 'npm run install' and wait for the dependencies to install
5.Run 'npm run build-clapper' which should start and run the UI service
//This should open a browser to the local webpage 'localhost:3006' where the application is deployed to
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser

//OPTIONAL FIX IF STEP 5 DOESN'T WORK:
5.1 Run 'cd clapper'
5.2.Run 'yarn build'
5.3.Run 'yarn install --frozen-lockfile'
5.4.Run 'yarn start'


//Now register your user
5.Leave the other terminal open and running and open a new one in Visual Studio with Terminal > New Terminal 
7.Run 'cd recorder'
6.Run 'node index.js signup --email YOUREMAIL --password YOURPASSWORD'
7.Run "cd .." 
8.Run 'npm run build-recorder' which should start the recording service

//Using CodeClapper
9. Open 'localhost:3006' in a new PRIVATE window in a browser and try to login with your new login.
//Some browsers will cache the old login so a private window ensure this doesn't happen

	
//Potential packages that might need to be installed manually (if you get an error saying something like 'firebase is not defined'
//or some other package, go to the home directory of the project and enter 'npm install -g PACKAGE'
//(possible packages: 'firebase','firebase-tools','yarn','react','react-app-rewind','react-scripts')


//Before I could install additional npm packages I had to take ownership of its files, if you get an error when running this, use this command if similar problem is ran into:
//1.5. Open a terminal run 'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'