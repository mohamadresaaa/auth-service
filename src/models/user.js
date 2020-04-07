const { ErrorMessage } = require("../lib/messages")
const { Schema, model } = require("mongoose")

const userSchema = new Schema({
	avatar: {
		default: null,
		type: String
	},
	bio: {
		default: null,
		type: String
	},
	birthday: {
		default: null,
		type: Date
	},
	email: {
		lowercase: true,
		required: true,
		trim: true,
		type: String,
		unique: true
	},
	isTwoFactorAuth: {
		default: false,
		type: Boolean
	},
	job: {
		default: null,
		type: String
	},
	name: {
		default: null,
		type: String
	},
	password: {
		required: true,
		type: String
	},
	roles: [{
		ref: "Role",
		type: Schema.Types.ObjectId
	}],
	status: {
		default: "inactive",
		type: String
	},
	username: {
		lowercase: true,
		required: true,
		trim: true,
		type: String,
		unique: true
	}
}, {
	timestamps: true
})

// Index fields
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ createdAt: -1 })

// Manage and prevent copy information from being imported email & username
userSchema.post("save", function (error, doc, next) {
	if (error.name === "MongoError" && error.code === 11000) {
		next(new ErrorMessage("Exists Data", `${error.keyPattern.username ? "Username" : "Email"} is already`, 422))
	} else {
		next()
	}
})

module.exports = model("User", userSchema)