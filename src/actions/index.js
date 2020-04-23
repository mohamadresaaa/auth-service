const { readdirSync } = require("fs")
const { resolve } = require("path")

const actions = {}

// Read and find directories
const findDirectories = readdirSync(resolve(__dirname)).filter((item) => !item.match("index.js"))

// Convert directories to object
for (const directory of findDirectories)
	actions[directory] = {}


// Read files of directory
Object.keys(actions).map(key => {
	for (const file of readdirSync(resolve(__dirname, key)))
		actions[key][file.replace(".js", "")] = require(resolve(__dirname, key, file))
})

module.exports = actions