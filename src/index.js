const App = require("./app")

// Set global config
global.config = require("../config")

// Creating new instance from App
new App().initialize()