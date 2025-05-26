# Remote Console

View your bangles console for a remote terminal and interact with is using a basic REPL.

The motivation for creating this is that during development of any clock/app/etc that requires connection to a device other than the espruino ide (for example if you are using gadgetbridge events/data) it is not possible to view any logs or debug problems. With this it is possible to monitor the device and even send commands to get data (similar but a bit less powerfull to the console in the espruino ide).

Below you can see it logging gadgetbridge events and then a command `Bangle.getStepCount()` being entered.

Requires gadgetbridge with http intents enabled.

## Usage

1. Install the app on your bangle
2. In the remote console folder, run server.js by runing `node server.js`
3. Update the settings of the remote console so they match what is outputted by `server.js`
4. Set active in the settings to true

## Features

- View console messages (`debug`,`log`,`info`,`warn`,`error`) in a terminal that is on a remote computer (i.e. not connected directly via bluetooth)
- Send basic oneline commands using REPL

## Development

This is written completely using typescript, so don't edit the js file directly or else the changes will be overwritted the next time anyone builds the project.

## Creator

Sam ([samakj](https://github.com/samakj))
