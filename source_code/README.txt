Make sure you have the following softwares installed before proceeding:
*Visual Studio Code 'https://code.visualstudio.com/download'
*NodeJS and npm package manager 'https://nodejs.org/en/download/'


//Installing Dependencies
1.Download and Open the project folder 'code-clapper-source-reconfigured' in Visual Studio Code

//Before I could install additional npm packages I had to take ownership of its files:
2.Open a terminal run 'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'
//Now we install the necessary packages to run the application:
3.Run 'npm install -g yarn'
4.Change directory to /clapper and enter 'npm install --save --legacy-peer-deps'
5.Change directory to ../recorder and enter 'npm install'

//Now we build the clapper
6.Change directory to the project home folder and enter the commands: (each one might take some time to finish)
	'npm run build-clapper'
	then 'npm run install-clapper'
	
//Now we start the services for the UI (this should open the UI in a browser)
7.Change directory to /clapper and enter 'yarn start'
//This should open a browser to the local webpage 'localhost:3006' where the application is deployed to
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser

//Now start the recording services
8.Open another terminal in the /recorder directory and enter 'npm run start'
//The full application should now be running and functional

9. If you're successfully able to launch the application, or at least UI, try to login with the dummy profile i've already created:
	login: dakotamoorese@gmail.com
	password: grandma123


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
