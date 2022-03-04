This is a directory containing experimental builds of the codeClapper software. 
These builds have no guaruntee of functioning properly and should only be used to deploy CodeClapper when directed to do so.

test-build-3-3 changes made:
 * Edited /recorder/commands/startCommand.js so that the initial logging of the devices is wrapped around if statements checking the length of the ids and names to prevent possible crashing from very large names or ids
 * Edited /recorder/commands/signupCommand.js to include a log message to confirm when an account has successfully been created.
