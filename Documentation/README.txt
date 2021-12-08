Make sure you have the following softwares installed:
*Visual Studio Code
*NodeJS and npm package manager


//Installing packages
*Open the project folder in Visual Studio Code
Open a terminal and install the following npm packages with 'npm install -g PACKAGENAME'
 'react'
 'react-app-rewired'
 'react-scripts'
 'yarn'
 'firebase-tools'
 
Change directory to recorder and enter 'npm install'
Change directory to ../clapper and enter 'npm install' again.
//if you run into errors that say permission denied, then run this command to change the packages ownership to yourself:
//'sudo chown -R $(whoami) $(npm config get prefix)/{lib,node_modules,bin,share}'
 

//Deploying clapper and recorder
Open a terminal in the main project directory and enter 'npm run build-clapper'
If it's successful, then run 'npm run install-clapper'
If both are successful, then change the directory to clapper and enter 'yarn start' to launch the UI if it didn't auto-deploy
//This should open a browser to the local webpage 'localhost:3006' where the application is deployed to
//This page can be accessed by devices on the same network by opening 'your_ip_address:3006' in a browser
Open a different terminal in the recorder directory and run 'npm run start' to start the recording utility

//Logging in
If you're successfully able to launch the application, or at least UI, try to login with the dummy profile i've already created:
login: dakotamoorese@gmail.com
password: grandma123

//Idk if the database persists when copying/pasting currently given that the application is hosted locally.
//If you're running into issues with "needing to login first" when trying to run things you're going to have to create a new profile:
	Open a terminal in the recorder directory and enter 'node index.js signup "EMAIL" "PASSWORD" '
	If successful, try to login with 'node index.js login "EMAIL" "PASSWORD"'
	//now you should be able to login into the gui after it's re-deployed
	

