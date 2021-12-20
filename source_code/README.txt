Make sure you have the following softwares installed before proceeding:
*Visual Studio Code 'https://code.visualstudio.com/download'
*NodeJS and npm package manager 'https://nodejs.org/en/download/'


//Installing Dependencies
1.Download and Open the project folder '/source_code/codeClapper' in Visual Studio Code

//Before I could install additional npm packages I had to take ownership of its files:
//1.5. Open a terminal run 'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'
//Now we install the necessary packages to run the application:
2.Run 'npm install -g yarn'
3.Run 'cd clapper'
4.Run 'npm install --save --legacy-peer-deps'
5.Run 'cd ../recorder'
6.Run 'npm install'

//Now we build and launch the clapper
7.Run 'cd ..'
8.Run 'npm run build-clapper'
9.Run 'npm run install-clapper'
10.Run 'cd clapper'
11.Run 'npm run start'
//This should open a browser to the local webpage 'localhost:3006' where the application is deployed to
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser

//Now register your user (Only done once)
12.Open a terminal at '/source_code/codeClapper/recorder'
13.Run 'node index.js signup --email YOUREMAIL --password YOURPASSWORD'
//switch out YOUREMAIL and YOURPASSWORD with what you want your login info to be
//Wait a couple seconds for it to run, but you'll most likely need to hit 'ctrl+c' to cancel out of the function

//Now start the recording services
14.Run 'npm run start'
//The full application should now be running and functional

9. Open 'localhost:3006' in a new PRIVATE window in a browser and try to login with your new login.
//Some browsers will cache the old login so a private window ensure this doesn't happen


POTENTIAL PROBLEMS AND FIXES

//You may need to change the ownership of the project folder using chown

//Logging in or "You must be logged in!" error
//Idk if the database persists when copying/pasting currently given that the application is hosted locally.
//If you're running into issues with "needing to login first" when trying to run things you're going to have to create a new profile:
	Open a terminal in the recorder directory and enter 'node index.js signup "EMAIL" "PASSWORD" '
	If successful, try to login with 'node index.js login "EMAIL" "PASSWORD"'
	//now you should be able to login into the gui after it's re-deployed
	
//Potential packages that might need to be installed manually (if you get an error saying something like 'firebase is not defined'
//or some other package, go to the home directory of the project and enter 'npm install -g PACKAGE'
//(possible packages: 'firebase','firebase-tools','yarn','react','react-app-rewind','react-scripts')
