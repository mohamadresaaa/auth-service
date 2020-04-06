const { readdirSync } = require("fs")
const { resolve } = require("path")

const controllers = {}

// Read controllers from directory
const files = readdirSync(resolve(__dirname)).filter((item) =>
	!item.match("index.js") && !item.match("baseController.js"))

console.log(files)

// Importing to controllers
for (const file of files) {
	controllers[file.replace("Controller.js", "")] = require(`${resolve(__dirname, file)}`)
}

module.exports = controllers